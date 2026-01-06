import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Credit costs per tool
const CREDIT_COSTS: Record<string, number> = {
  'content-ai': 1,
  'ui-copy': 1,
  'app-helper': 2,
  'image-ai': 5,
  'advanced-ai': 3,
};

// Model mapping per tool
const TOOL_MODELS: Record<string, string> = {
  'content-ai': 'google/gemini-2.5-flash',
  'ui-copy': 'google/gemini-2.5-flash-lite',
  'app-helper': 'google/gemini-2.5-flash',
  'image-ai': 'google/gemini-2.5-flash-image-preview',
  'advanced-ai': 'google/gemini-2.5-pro',
};

// System prompts per tool
const SYSTEM_PROMPTS: Record<string, string> = {
  'content-ai': 'You are a professional content writer. Create engaging, well-structured content based on user prompts. Be creative, clear, and compelling.',
  'ui-copy': 'You are a UX writer specializing in UI microcopy. Create concise, user-friendly text for buttons, labels, tooltips, error messages, and onboarding flows.',
  'app-helper': 'You are an expert app development assistant. Help users with coding questions, architecture decisions, and best practices. Provide clear, actionable advice.',
  'image-ai': 'Generate a high-quality, detailed image based on this description.',
  'advanced-ai': 'You are an advanced AI assistant capable of complex reasoning, analysis, and creative problem-solving. Provide thorough, well-reasoned responses.',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Verify user token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { tool, prompt, projectName } = await req.json();

    if (!tool || !prompt) {
      return new Response(
        JSON.stringify({ error: 'Tool and prompt are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const creditCost = CREDIT_COSTS[tool] || 1;
    const model = TOOL_MODELS[tool] || 'google/gemini-2.5-flash';
    const systemPrompt = SYSTEM_PROMPTS[tool] || 'You are a helpful AI assistant.';

    // Check user credits
    const { data: credits, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits_balance')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !credits) {
      console.error('Credits error:', creditsError);
      return new Response(
        JSON.stringify({ error: 'Could not fetch user credits' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (credits.credits_balance < creditCost) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient credits',
          required: creditCost,
          balance: credits.credits_balance
        }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${tool} request for user ${user.id}, cost: ${creditCost} credits, model: ${model}`);

    // Build request body - add modalities for image generation
    const requestBody: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
    };

    // For image generation, add modalities
    if (tool === 'image-ai') {
      requestBody.modalities = ['image', 'text'];
    }

    // Call Lovable AI Gateway
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'AI generation failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    console.log('AI response structure:', JSON.stringify({
      hasChoices: !!aiData.choices,
      choicesLength: aiData.choices?.length,
      hasImages: !!aiData.choices?.[0]?.message?.images,
      imagesLength: aiData.choices?.[0]?.message?.images?.length,
    }));

    // Extract content and image URL
    const textContent = aiData.choices?.[0]?.message?.content || '';
    const imageUrl = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url || null;
    const tokensUsed = aiData.usage?.total_tokens || 0;

    // Deduct credits
    const { error: deductError } = await supabase
      .from('user_credits')
      .update({ credits_balance: credits.credits_balance - creditCost })
      .eq('user_id', user.id);

    if (deductError) {
      console.error('Deduct error:', deductError);
    }

    // Log usage
    await supabase.from('usage_history').insert({
      user_id: user.id,
      tool,
      model,
      credits_used: creditCost,
      prompt: prompt.substring(0, 500),
      tokens_used: tokensUsed,
    });

    // If projectName provided, save/update project
    if (projectName) {
      const projectContent = {
        prompt,
        output: textContent,
        imageUrl: imageUrl,
        model
      };

      const { data: existingProject } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', projectName)
        .maybeSingle();

      if (existingProject) {
        await supabase
          .from('projects')
          .update({ 
            content: projectContent,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProject.id);
      } else {
        await supabase.from('projects').insert({
          user_id: user.id,
          name: projectName,
          type: tool,
          content: projectContent,
        });
      }
    }

    return new Response(
      JSON.stringify({
        content: textContent,
        imageUrl: imageUrl,
        credits_used: creditCost,
        credits_remaining: credits.credits_balance - creditCost,
        tokens_used: tokensUsed,
        model,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('Error in ai-generate function:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
