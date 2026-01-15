# Quick Fixes - Ready to Implement

This file contains copy-paste ready solutions for the most critical issues.

---

## Fix 1: Enhanced tsconfig.json

**File:** `tsconfig.json`

```jsonc
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    // ✅ ENABLE STRICT TYPE CHECKING
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // ✅ CATCH CODE QUALITY ISSUES
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    
    // ✅ MODERN DEFAULTS
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    
    // ✅ BETTER DEBUGGING
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    
    // ✅ COMPATIBILITY
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

---

## Fix 2: Enhanced tsconfig.app.json

**File:** `tsconfig.app.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* ✅ STRICT MODE */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitAny": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## Fix 3: Enhanced eslint.config.js

**File:** `eslint.config.js`

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      
      // ✅ CRITICAL RULES - ENABLE
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-types": [
        "warn",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      
      // ✅ GENERAL RULES
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "prefer-const": "warn",
    },
  }
);
```

---

## Fix 4: Improved useAuth.ts

**File:** `src/hooks/useAuth.ts`

```typescript
import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

interface AuthError {
  message: string;
  code?: string;
}

interface UseAuthReturn extends AuthState {
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<{ data: any; error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ data: any; error: AuthError | null }>;
}

export function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; // ✅ Prevent state updates after unmount

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (isMounted) {
          setAuthState({
            user: session?.user ?? null,
            session,
            loading: false,
            error: null,
          });
        }
      }
    );

    // Check for existing session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (isMounted) {
          setAuthState({
            user: session?.user ?? null,
            session,
            loading: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setAuthState((prev) => ({
            ...prev,
            loading: false,
            error: error as Error,
          }));
        }
      });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName?: string) => {
      const redirectUrl = `${window.location.origin}/`;

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { display_name: displayName },
          },
        });
        return { data, error: error ? { message: error.message } : null };
      } catch (error) {
        return { data: null, error: { message: String(error) } };
      }
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { data, error: error ? { message: error.message } : null };
      } catch (error) {
        return { data: null, error: { message: String(error) } };
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error ? { message: error.message } : null };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=recovery`,
      });
      return { data, error: error ? { message: error.message } : null };
    } catch (error) {
      return { data: null, error: { message: String(error) } };
    }
  }, []);

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };
}
```

---

## Fix 5: Improved ErrorBoundary.tsx

**File:** `src/components/ErrorBoundary.tsx`

```typescript
import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  copied?: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleHome = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.href = "/";
  };

  private handleCopyError = (): void => {
    const errorText = `${this.state.error?.message}\n\n${
      this.state.errorInfo?.componentStack || ""
    }`;
    navigator.clipboard.writeText(errorText);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-8">
              We encountered an unexpected error. Please try again or return to the
              homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={this.handleHome}>
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground font-semibold">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 space-y-2">
                  <pre className="p-4 rounded-lg bg-card border border-destructive/50 text-left text-xs text-muted-foreground overflow-auto max-h-48">
                    {this.state.error.message}
                    {this.state.errorInfo &&
                      `\n\nComponent Stack:\n${this.state.errorInfo.componentStack}`}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={this.handleCopyError}
                    className="w-full"
                  >
                    {this.state.copied ? (
                      <>
                        <Check className="w-3 h-3 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-2" />
                        Copy Error
                      </>
                    )}
                  </Button>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## Fix 6: Improved vite.config.ts

**File:** `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // ✅ Better code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-alert-dialog"],
          animations: ["framer-motion"],
          query: ["@tanstack/react-query"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: mode === "development",
    minify: "terser",
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

---

## Fix 7: Create .env.example

**File:** `.env.example`

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# API Configuration (Optional)
VITE_API_BASE_URL=https://api.blueforge.dev

# App Configuration
VITE_APP_NAME=Blue Forge
VITE_APP_VERSION=1.0.0
```

---

## Fix 8: Create .gitignore additions

**Ensure these are in `.gitignore`:**

```
# Environment variables
.env
.env.local
.env.*.local

# Build output
dist/
build/

# Dependencies
node_modules/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
.nyc_output/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
```

---

## Fix 9: Create constants file

**File:** `src/constants/routes.ts`

```typescript
// ✅ Centralize route definitions
export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  AI_STUDIO: "/ai-studio",
  PRODUCTS: "/products",
  LABS: "/labs",
  WORK: "/work",
  ABOUT: "/about",
  CONTACT: "/contact",
  AUTH: "/auth",
  PRICING: "/pricing",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  ADMIN: "/admin",
  PROFILE: "/profile",
  VERIFY_EMAIL: "/verify-email",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.SERVICES,
  ROUTES.AI_STUDIO,
  ROUTES.PRODUCTS,
  ROUTES.PRICING,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.TERMS,
  ROUTES.PRIVACY,
] as const;

export const PROTECTED_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.PROFILE,
] as const;
```

---

## Fix 10: Create config constants

**File:** `src/constants/config.ts`

```typescript
// ✅ Centralize configuration
export const APP_CONFIG = {
  NAME: "Blue Forge",
  VERSION: "1.0.0",
  DESCRIPTION: "Modern web development platform",
  BASE_URL: process.env.VITE_APP_URL || "https://blueforge.dev",
  API_BASE_URL: process.env.VITE_API_BASE_URL || "https://api.blueforge.dev",
} as const;

export const AUTH_CONFIG = {
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
  TOKEN_REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  CACHE_TIME: 1000 * 60 * 10, // 10 minutes
  RETRY_ATTEMPTS: 1,
  RETRY_DELAY: 1000,
} as const;

export const UI_CONFIG = {
  COOKIE_CONSENT_DELAY: 3000, // 3 seconds
  COOKIE_CONSENT_VERSION: "1.0",
  THEME_TRANSITION_DURATION: 300, // ms
} as const;
```

---

## Implementation Checklist

- [ ] Update `tsconfig.json` with strict mode
- [ ] Update `tsconfig.app.json` with strict mode
- [ ] Replace `eslint.config.js`
- [ ] Replace `src/hooks/useAuth.ts`
- [ ] Replace `src/components/ErrorBoundary.tsx`
- [ ] Update `vite.config.ts`
- [ ] Create `.env.example`
- [ ] Verify `.gitignore`
- [ ] Create `src/constants/routes.ts`
- [ ] Create `src/constants/config.ts`
- [ ] Run `npm run lint` to check for new errors
- [ ] Test application in development

---

## Verification Commands

After implementing fixes:

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Run ESLint
npm run lint

# Build test
npm run build

# Run dev server
npm run dev
```

