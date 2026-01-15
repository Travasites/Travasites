# API Integration & Optimization Guide

**Date:** January 15, 2026  
**Project:** Blue Forge - The Forge AI Studio

---

## 📋 Current API Setup

### The Forge's 3 Products & Current APIs

| Product | Current API | Cost | Speed | Status |
|---------|------------|------|-------|--------|
| Mobile-First Architect | Google Gemini 2.5 Flash | Free (2M tokens/mo) | ⚡ Good | ✅ Active |
| Code Refiner | Google Gemini 2.5 Flash | Free (2M tokens/mo) | ⚡ Good | ✅ Active |
| Performance Predictor | Google Gemini 2.5 Flash | Free (2M tokens/mo) | ⚡ Good | ✅ Active |

---

## 🎯 Recommended API Stack (IMPROVED)

### Product 1: Mobile-First Architect Tool

#### Primary: Google Gemini 2.5 Flash (Already Configured ✅)
```
Endpoint: google/gemini-2.5-flash
Cost: FREE (2M tokens/month free tier)
Speed: 3-5 seconds per request
Perfect for: UI design, architecture planning
Status: Active and working well
```

#### Fallback 1: Groq API (Fast Alternative)
```
Model: mistralai/mixtral-8x7b-instruct-v0.1
Endpoint: https://api.groq.com/openai/v1/chat/completions
Speed: 10-20 tokens/second (EXTREMELY FAST ⚡⚡⚡)
Cost: ~$0.01 per request
Free Tier: Limited but cheap
Perfect for: Real-time UI generation feedback
Integration: Simple OpenAI-compatible API
```

#### Fallback 2: Claude API (Alternative)
```
Model: claude-3-5-sonnet
Cost: $0.003 per 1K input / $0.015 per 1K output
Speed: 2-4 seconds
Perfect for: Detailed design documentation
```

---

### Product 2: Code Refiner Tool

#### Primary: StarCoder2 (Recommended for Code)
```
Model: mistralai/mixtral-8x7b-instruct-v0.1 (code-optimized)
Provider: Hugging Face API
Endpoint: https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1
Cost: FREE
Speed: 5-10 seconds
Perfect for: Code analysis, optimization suggestions
Key Features:
- Purpose-built for code tasks
- Supports multiple languages (Python, TypeScript, Rust, etc.)
- No rate limiting for reasonable usage
- Open-source transparency
```

**Setup Instructions:**
```typescript
// src/lib/api/code-refiner.ts
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HF_API_KEY;
const MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";

export const analyzeCode = async (code: string) => {
  const response = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL}`,
    {
      headers: { Authorization: `Bearer ${HUGGING_FACE_API_KEY}` },
      method: "POST",
      body: JSON.stringify({
        inputs: `Analyze this code for optimization and security:\n\n${code}`,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.3,
        },
      }),
    }
  );
  
  return response.json();
};
```

#### Fallback 1: DeepSeek Code API
```
Model: deepseek-coder
Endpoint: https://api.deepseek.com/chat/completions
Cost: ~$0.14 per million tokens
Speed: 5-8 seconds
Perfect for: Production code analysis
```

#### Fallback 2: Self-Hosted Ollama (Totally Free)
```
Option: Run locally with Ollama
Models: llama2-uncensored, mistral
Cost: FREE (just server costs)
Speed: Depends on hardware
Perfect for: Private deployments
```

---

### Product 3: Performance Predictor Tool

#### Primary: Google Pagespeed Insights API (FREE ✅)
```
Endpoint: https://www.googleapis.com/pagespeedonline/v5/runPagespeed
API Key: Required (free to create)
Cost: FREE (25,000 requests/day)
Speed: 2-3 seconds
Perfect for: Real Core Web Vitals metrics
Returns:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- Performance score
- Optimization recommendations
```

**Setup Instructions:**
```typescript
// src/lib/api/performance-predictor.ts
const PAGESPEED_API_KEY = import.meta.env.VITE_PAGESPEED_API_KEY;

export const analyzePerformance = async (url: string) => {
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${PAGESPEED_API_KEY}&category=PERFORMANCE`
  );
  
  const data = await response.json();
  
  return {
    score: data.lighthouseResult.categories.performance.score,
    metrics: {
      lcp: data.lighthouseResult.audits['largest-contentful-paint']?.displayValue,
      fid: data.lighthouseResult.audits['first-input-delay']?.displayValue,
      cls: data.lighthouseResult.audits['cumulative-layout-shift']?.displayValue,
    },
    opportunities: data.lighthouseResult.categories.opportunities,
  };
};
```

#### Fallback 1: WebPageTest API (Detailed Testing)
```
Endpoint: https://www.webpagetest.org/api/
Cost: Free tier available
Speed: 5-10 seconds per test
Perfect for: Detailed waterfall analysis
Returns:
- Full request timeline
- Video capture
- Filmstrip
- Request details
```

#### Fallback 2: Speedlify (Monitoring)
```
Purpose: Continuous performance monitoring
Cost: Free for open-source
Perfect for: Long-term trend tracking
```

---

## 🔧 Implementation: API Fallback Pattern

### Best Practice: Fallback Chain Strategy

```typescript
// src/lib/api/fallback-handler.ts
import { toast } from "@/hooks/use-toast";

interface APIFallback {
  name: string;
  call: () => Promise<any>;
  timeout?: number;
}

export const callWithFallback = async (
  fallbacks: APIFallback[],
  timeout = 10000
) => {
  for (const fallback of fallbacks) {
    try {
      console.log(`Trying ${fallback.name}...`);
      
      const result = await Promise.race([
        fallback.call(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), fallback.timeout || timeout)
        ),
      ]);
      
      console.log(`✅ ${fallback.name} succeeded`);
      return result;
    } catch (error) {
      console.warn(`⚠️ ${fallback.name} failed:`, error);
      continue;
    }
  }
  
  throw new Error("All API endpoints failed");
};

// Usage in AI Studio
export const generateArchitecture = async (prompt: string) => {
  try {
    return await callWithFallback([
      {
        name: "Google Gemini",
        call: async () => {
          // Call Gemini API
          return callGemini(prompt);
        },
        timeout: 8000,
      },
      {
        name: "Groq Mixtral",
        call: async () => {
          // Call Groq API
          return callGroq(prompt);
        },
        timeout: 15000,
      },
      {
        name: "Claude API",
        call: async () => {
          // Call Claude API
          return callClaude(prompt);
        },
        timeout: 8000,
      },
    ]);
  } catch (error) {
    toast({
      title: "API Error",
      description: "All AI services are currently unavailable. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};
```

---

## 📊 API Comparison Table

### Cost Analysis

```
Monthly Usage Estimate: 500 requests/month per tool

┌─────────────────────┬──────────────┬───────┬─────────┬──────────┐
│ API                 │ Free Tier    │ Cost  │ Speed   │ Quality  │
├─────────────────────┼──────────────┼───────┼─────────┼──────────┤
│ Gemini 2.5F         │ 2M tok/mo    │ FREE  │ ⚡⚡    │ Excellent│
│ Groq Mixtral        │ Limited      │ $0-5  │ ⚡⚡⚡  │ Very Good│
│ Claude 3.5          │ None         │ $5-20 │ ⚡⚡    │ Excellent│
│ StarCoder2 (HF)     │ Unlimited    │ FREE  │ ⚡⚡    │ Very Good│
│ DeepSeek Code       │ Limited      │ $0-5  │ ⚡⚡    │ Good     │
│ Ollama (Self-host)  │ Unlimited    │ FREE  │ ⚡     │ Good     │
│ Pagespeed Insights  │ 25k req/day  │ FREE  │ ⚡⚡    │ Excellent│
│ WebPageTest         │ 100 req/mo   │ FREE  │ ⚡     │ Excellent│
└─────────────────────┴──────────────┴───────┴─────────┴──────────┘

Total Monthly Cost with Optimal Setup: $0-10 (mostly free!)
```

---

## 🚀 Setup Instructions

### Step 1: Get API Keys

```bash
# Google Gemini & Pagespeed Insights
1. Go to: https://console.cloud.google.com
2. Create new project
3. Enable APIs: "Generative Language API", "PageSpeed Insights API"
4. Create API key
5. Set in .env.local: VITE_GOOGLE_API_KEY=your_key

# Groq API (Optional)
1. Go to: https://www.groq.com
2. Sign up for free
3. Get API key from dashboard
4. Set in .env.local: VITE_GROQ_API_KEY=your_key

# Hugging Face (for StarCoder2)
1. Go to: https://huggingface.co
2. Create account
3. Generate API token in settings
4. Set in .env.local: VITE_HF_API_KEY=your_token
```

### Step 2: Update Environment Variables

```env
# .env.local
VITE_GOOGLE_API_KEY=your_google_key_here
VITE_GROQ_API_KEY=your_groq_key_here
VITE_HF_API_KEY=your_huggingface_token_here
VITE_PAGESPEED_API_KEY=your_google_key_here
```

### Step 3: Create API Integration Module

```typescript
// src/lib/api/index.ts
export { generateArchitecture } from './architect-api';
export { analyzeCode } from './refiner-api';
export { analyzePerformance } from './predictor-api';
export { callWithFallback } from './fallback-handler';
```

### Step 4: Update Supabase Edge Function

```typescript
// supabase/functions/ai-generate/index.ts
import { callWithFallback } from "../../../src/lib/api/fallback-handler";

const TOOL_APIS: Record<string, any[]> = {
  'architect': [
    { name: 'Gemini', call: callGemini },
    { name: 'Groq', call: callGroq },
  ],
  'refiner': [
    { name: 'StarCoder2', call: callStarCoder },
    { name: 'DeepSeek', call: callDeepSeek },
  ],
  'predictor': [
    { name: 'Pagespeed', call: callPagespeed },
    { name: 'WebPageTest', call: callWebPageTest },
  ],
};

// Use fallback in edge function
const result = await callWithFallback(TOOL_APIS[tool]);
```

---

## 🔐 Security Best Practices

### 1. Secure API Keys

```typescript
// ❌ NEVER do this
const apiKey = "sk-xxx"; // Exposed in client

// ✅ DO THIS
// In Supabase Edge Function (secure)
const apiKey = Deno.env.get("GOOGLE_API_KEY");
```

### 2. Rate Limiting

```typescript
// src/lib/api/rate-limit.ts
import { RateLimiter } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiter({
  points: 10, // 10 requests
  duration: 60 // per 60 seconds
});

export const checkRateLimit = async (userId: string) => {
  try {
    await rateLimiter.consume(userId);
    return true;
  } catch {
    return false;
  }
};
```

### 3. Request Validation

```typescript
// src/lib/api/validators.ts
export const validateArchitectPrompt = (prompt: string): boolean => {
  const minLength = 10;
  const maxLength = 5000;
  
  return prompt.length >= minLength && prompt.length <= maxLength;
};

export const validateCodeInput = (code: string): boolean => {
  const minLength = 20;
  const maxLength = 50000;
  
  return code.length >= minLength && code.length <= maxLength;
};
```

---

## 📈 Monitoring & Analytics

### Track API Performance

```typescript
// src/lib/api/monitoring.ts
export const logAPICall = async (
  tool: string,
  api: string,
  duration: number,
  success: boolean,
  tokensUsed?: number
) => {
  await supabase
    .from('api_calls_log')
    .insert({
      tool,
      api,
      duration_ms: duration,
      success,
      tokens_used: tokensUsed,
      created_at: new Date(),
    });
};

// Usage
const startTime = performance.now();
try {
  const result = await callAPI(...);
  const duration = performance.now() - startTime;
  await logAPICall('architect', 'gemini', duration, true);
} catch (error) {
  const duration = performance.now() - startTime;
  await logAPICall('architect', 'gemini', duration, false);
}
```

---

## 🎯 Recommended Free Tier Setup (BEST CHOICE)

```
✅ Mobile-First Architect: Google Gemini (already configured)
✅ Code Refiner: StarCoder2 via Hugging Face (FREE)
✅ Performance Predictor: Google Pagespeed Insights (FREE)

Fallbacks:
- Architect: Groq Mixtral (~$0.01/request)
- Code Refiner: DeepSeek Code (~$0.0001/request)
- Predictor: WebPageTest (100/month free)

Total Cost: FREE to $1-2/month

Advantages:
- No API costs for primary endpoints
- Instant fallback if primary fails
- Different model diversity for better results
- Room to scale without major expense
```

---

## 📞 Integration Checklist

- [ ] Create Google Cloud project and get API keys
- [ ] Create Groq account and get API key (optional)
- [ ] Create Hugging Face account and get API token
- [ ] Add all keys to `.env.local`
- [ ] Create fallback handler utility
- [ ] Update API integration module
- [ ] Test each API endpoint independently
- [ ] Test fallback chain
- [ ] Update Supabase edge function
- [ ] Add error handling and user feedback
- [ ] Setup monitoring and logging
- [ ] Test rate limiting
- [ ] Load test with 100+ requests
- [ ] Document API decisions

---

## 🚨 Troubleshooting

### API Key Not Working?
```typescript
// Test API key validity
const testAPI = async () => {
  try {
    const response = await callAPI("test-prompt");
    console.log("✅ API working");
  } catch (error) {
    console.error("❌ API failed:", error);
  }
};
```

### Slow Response?
1. Check network tab in DevTools
2. Verify which API is being used (fallback?)
3. Check API service status dashboard
4. Increase timeout if needed

### Rate Limit Hit?
1. Check free tier quota
2. Implement request queuing
3. Cache successful responses
4. Upgrade to paid plan if needed

---

**Last Updated:** January 15, 2026  
**Status:** Ready for implementation  
**Estimated Setup Time:** 30-45 minutes
