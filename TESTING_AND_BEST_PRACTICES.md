# Testing & Best Practices Guide

## 1. Setting Up Testing Framework

### Install Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Create vitest.config.ts

**File:** `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.tsx',
        'src/**/__tests__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Create Test Setup File

**File:** `src/test/setup.ts`

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
```

### Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 2. Example Test Files

### Test: ThemeToggle Component

**File:** `src/components/__tests__/ThemeToggle.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ThemeToggle';

describe('ThemeToggle', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        {component}
      </ThemeProvider>
    );
  };

  it('renders theme toggle button', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has appropriate aria-label', () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(button).toBeInTheDocument();
  });
});
```

### Test: AuthGuard Component

**File:** `src/components/__tests__/AuthGuard.test.tsx`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthGuard } from '@/components/AuthGuard';
import * as authHook from '@/hooks/useAuth';

describe('AuthGuard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('shows loading spinner while loading', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: true,
      error: null,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });

    renderWithRouter(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      user: { id: '123', email: 'test@example.com' } as any,
      session: {} as any,
      loading: false,
      error: null,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });

    renderWithRouter(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to auth when user is not authenticated', async () => {
    vi.spyOn(authHook, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      error: null,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPassword: vi.fn(),
    });

    renderWithRouter(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });
  });
});
```

### Test: useAuth Hook

**File:** `src/hooks/__tests__/useAuth.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

vi.mock('@/integrations/supabase/client');

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with loading state', () => {
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
  });

  it('updates state after session is fetched', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
    };

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: mockSession },
    } as any);

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockSession.user);
    expect(result.current.session).toEqual(mockSession);
  });

  it('handles sign in correctly', async () => {
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);

    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { session: { user: { id: '123' } } },
      error: null,
    } as any);

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn('test@example.com', 'password');
    });

    expect(signInResult.error).toBeNull();
  });

  it('handles sign in errors', async () => {
    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    } as any);

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
    } as any);

    vi.mocked(supabase.auth.signInWithPassword).mockRejectedValue(
      new Error('Invalid credentials')
    );

    const { result } = renderHook(() => useAuth());

    let signInResult;
    await act(async () => {
      signInResult = await result.current.signIn('test@example.com', 'wrong');
    });

    expect(signInResult.error).not.toBeNull();
  });
});
```

---

## 3. Component Testing Best Practices

### ✅ DO

```typescript
// ✅ Test user interactions, not implementation
it('submits form on button click', async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={vi.fn()} />);
  
  const submitButton = screen.getByRole('button', { name: /submit/i });
  await user.click(submitButton);
  
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// ✅ Use semantic queries
screen.getByRole('button', { name: /click me/i });
screen.getByLabelText('Username');
screen.getByPlaceholderText('Enter your email');

// ✅ Test accessibility
it('has proper ARIA labels', () => {
  render(<Button aria-label="Close dialog" />);
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
});

// ✅ Test error states
it('displays error message on failure', async () => {
  vi.mocked(api.fetchData).mockRejectedValue(new Error('Failed'));
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

### ❌ DON'T

```typescript
// ❌ Don't test implementation details
it('sets state to loading', () => {
  const { result } = renderHook(() => useState(false));
  // Don't access internal state like this
  expect(result.current[0]).toBe(false);
});

// ❌ Don't use non-semantic queries
screen.getByTestId('submit-button');
container.querySelector('.button');

// ❌ Don't mock child components excessively
vi.mock('@/components/Button'); // Avoid if possible

// ❌ Don't test library code
it('className is correctly set', () => {
  // Don't test CSS framework behavior
  expect(component).toHaveClass('p-4');
});
```

---

## 4. Hook Testing Best Practices

### ✅ DO

```typescript
// ✅ Test hook behavior
it('returns loading state initially', () => {
  const { result } = renderHook(() => useFetch('/api/data'));
  expect(result.current.loading).toBe(true);
});

// ✅ Use act() for state updates
await act(async () => {
  result.current.refetch();
});

// ✅ Test error handling
it('handles errors gracefully', async () => {
  vi.mocked(fetchData).mockRejectedValue(new Error('Network error'));
  const { result } = renderHook(() => useFetch('/api/data'));
  
  await waitFor(() => {
    expect(result.current.error).toBeDefined();
  });
});

// ✅ Test cleanup
it('unsubscribes on unmount', () => {
  const unsubscribe = vi.fn();
  vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
    data: { subscription: { unsubscribe } },
  } as any);
  
  const { unmount } = renderHook(() => useAuth());
  unmount();
  
  expect(unsubscribe).toHaveBeenCalled();
});
```

---

## 5. Adding Pre-commit Hooks

### Install husky

```bash
npm install --save-dev husky lint-staged

npx husky install
```

### Create Pre-commit Hook

**File:** `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### Create lint-staged Config

**File:** `.lintstagedrc.json`

```json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

---

## 6. Code Coverage Goals

### Target Metrics

```
Statements   : 80% (aim for 85%+)
Branches     : 75% (aim for 80%+)
Functions    : 80% (aim for 85%+)
Lines        : 80% (aim for 85%+)
```

### Create Coverage Config

**Add to `vitest.config.ts`:**

```typescript
test: {
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html', 'lcov'],
    include: ['src/**/*.{ts,tsx}'],
    exclude: [
      'src/**/*.d.ts',
      'src/**/*.stories.tsx',
      'src/**/__tests__/**',
    ],
    lines: 80,
    functions: 80,
    branches: 75,
    statements: 80,
  },
}
```

### Check Coverage

```bash
npm run test:coverage
```

---

## 7. Performance Testing

### React Testing Library Performance

```typescript
import { screen, waitFor } from '@testing-library/react';

it('renders list with 1000 items efficiently', async () => {
  const startTime = performance.now();
  
  render(<VirtualizedList items={Array(1000).fill({id: 1})} />);
  
  const endTime = performance.now();
  expect(endTime - startTime).toBeLessThan(100); // ms
});
```

---

## 8. Integration Testing Example

**File:** `src/pages/__tests__/Auth.integration.test.tsx`

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Auth } from '@/pages/Auth';

describe('Auth Page Integration', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('allows user to sign in with valid credentials', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      // Verify success state or navigation
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  it('displays error message with invalid credentials', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'invalid@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

---

## 9. Debugging Tests

### Use vitest UI

```bash
npm run test:ui
```

### Add Console Logs

```typescript
import { debug } from '@testing-library/react';

it('debugs component rendering', () => {
  const { container } = render(<MyComponent />);
  debug(container); // Prints rendered HTML
});
```

### Use screen.logTestingPlaygroundURL()

```typescript
it('helps understand test queries', () => {
  render(<MyComponent />);
  screen.logTestingPlaygroundURL(); // Provides testing playground link
});
```

---

## 10. Testing Checklist

Before marking a component as complete:

- [ ] Component renders without errors
- [ ] All user interactions tested (click, type, submit)
- [ ] Error states handled
- [ ] Loading states tested
- [ ] Accessibility features verified (ARIA labels, keyboard nav)
- [ ] Edge cases considered
- [ ] Responsive behavior tested
- [ ] Memory leaks prevented (cleanup tested)
- [ ] Code coverage > 80%
- [ ] No console warnings or errors

---

## Example Test Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       ├── Button.test.tsx
│       ├── Button.integration.test.tsx
│       └── Button.accessibility.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── __tests__/
│       └── useAuth.test.ts
└── pages/
    ├── Auth.tsx
    └── __tests__/
        ├── Auth.test.tsx
        └── Auth.integration.test.tsx
```

