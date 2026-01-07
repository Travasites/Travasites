import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Credit costs per tool - The Forge tools
const CREDIT_COSTS: Record<string, number> = {
  'architect': 3,    // Mobile-First Architect
  'refiner': 2,      // Code Refiner
  'predictor': 2,    // Performance Predictor
};

// Model mapping per tool
const TOOL_MODELS: Record<string, string> = {
  'architect': 'google/gemini-2.5-flash',
  'refiner': 'google/gemini-2.5-flash',
  'predictor': 'google/gemini-2.5-flash',
};

// System prompts per tool - The BlueForge Architect prompts
const SYSTEM_PROMPTS: Record<string, string> = {
  'architect': `You are the BlueForge Architect. You are an expert in mobile-first web development, Kubernetes infrastructure, and Laravel backends. Your goal is to help users build production-ready digital products.

When a user gives you a business idea, provide a detailed technical blueprint:

## 📱 Screen Flow
List 5-8 essential mobile screens in order of user journey. For each screen:
- Screen name and purpose
- Key user actions
- Navigation connections

## 🧩 UI Component List
Recommend specific mobile-first components:
- Navigation patterns (e.g., Sticky Bottom Nav, Tab Bar)
- Content containers (e.g., Modular Cards, Expandable Sections)
- Input patterns (e.g., Floating Labels, Smart Keyboards)
- Feedback elements (e.g., Toast Notifications, Loading Skeletons)

## 👆 UX Tips
Provide 5 specific tips for:
- Thumb-reachability (safe zones, action placement)
- Mobile accessibility (touch targets, contrast, font sizes)
- Performance considerations for mobile networks
- Offline-first strategies
- Device-specific optimizations

Be specific and actionable. Reference actual component libraries when helpful. Always prioritize mobile-first design patterns.`,

  'refiner': `You are the BlueForge Code Refiner. You analyze code and provide expert recommendations for production readiness.

When a user provides code (React, PHP/Laravel, API routes, or any web code), analyze it and provide:

## ⚡ Performance Fixes
- Optimizations for high-latency mobile networks
- Bundle size recommendations
- Lazy loading opportunities
- Caching strategies
- Database query optimizations

## 🔒 Security Hardening
- CSRF protection recommendations
- Rate limiting implementation
- Input validation improvements
- Authentication/authorization checks
- SQL injection prevention
- XSS protection

## 🚀 Deployment Readiness
- Kubernetes configuration recommendations
- Coolify/Hetzner environment considerations
- Environment variable management
- Health check endpoints
- Logging improvements
- Error handling enhancements

Format your response with clear sections. Be specific about line numbers and exact changes needed. Provide code examples where helpful.`,

  'predictor': `You are the BlueForge Performance Predictor. You analyze feature ideas and predict their performance impact.

When a user describes a feature they want to implement, provide:

## 📊 Core Web Vitals Impact Prediction

### LCP (Largest Contentful Paint)
- Predicted impact: [increase/decrease/neutral] 
- Estimated change: [+/- Xms or %]
- Key factors affecting LCP

### FID/INP (First Input Delay / Interaction to Next Paint)
- Predicted impact: [increase/decrease/neutral]
- Estimated change: [+/- Xms or %]
- Key factors affecting interactivity

### CLS (Cumulative Layout Shift)
- Predicted impact: [increase/decrease/neutral]
- Estimated change: [+/- X.XX or %]
- Key factors affecting layout stability

## 💾 Recommended Caching Strategy
- Browser cache headers (Cache-Control, ETag)
- CDN configuration (Cloudflare settings)
- Service worker caching patterns
- API response caching
- Static asset optimization

## 📱 Mobile-First Optimization Tips
- Network-aware loading strategies
- Image optimization recommendations
- JavaScript bundle considerations
- Critical rendering path optimizations
- Progressive enhancement approach

Provide quantified predictions where possible. Reference real-world benchmarks and best practices.`,
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

    const creditCost = CREDIT_COSTS[tool] || 2;
    const model = TOOL_MODELS[tool] || 'google/gemini-2.5-flash';
    const systemPrompt = SYSTEM_PROMPTS[tool] || 'You are a helpful AI assistant for mobile-first web development.';

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

    // Build request body
    const requestBody: Record<string, unknown> = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
    };

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
    console.log('AI response received, processing...');

    // Extract content
    const textContent = aiData.choices?.[0]?.message?.content || '';
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
