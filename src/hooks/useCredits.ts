import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'business';

interface UserCredits {
  credits_balance: number;
  total_credits_purchased: number;
  plan: SubscriptionPlan;
}

interface UsageHistory {
  id: string;
  tool: string;
  model: string | null;
  credits_used: number;
  prompt: string | null;
  tokens_used: number | null;
  created_at: string;
}

// Tools that require paid plans (Starter and up)
const PAID_TOOLS = ['ui-copy', 'app-helper'];

export function useCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [usage, setUsage] = useState<UsageHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    if (!user) return;
    
    // Fetch credits
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('credits_balance, total_credits_purchased')
      .eq('user_id', user.id)
      .single();

    // Fetch profile for plan
    const { data: profileData, error: _profileError } = await supabase
      .from('profiles')
      .select('plan')
      .eq('user_id', user.id)
      .single();

    if (!creditsError && creditsData) {
      setCredits({
        credits_balance: creditsData.credits_balance,
        total_credits_purchased: creditsData.total_credits_purchased,
        plan: (profileData?.plan as SubscriptionPlan) || 'free',
      });
    }
    setLoading(false);
  }, [user]);

  const fetchUsage = useCallback(async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('usage_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setUsage(data);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCredits();
      fetchUsage();
    } else {
      setCredits(null);
      setUsage([]);
      setLoading(false);
    }
  }, [user, fetchCredits, fetchUsage]);

  const refreshCredits = useCallback(() => {
    fetchCredits();
    fetchUsage();
  }, [fetchCredits, fetchUsage]);

  // Check if user can access a specific tool
  const canAccessTool = useCallback((toolId: string): boolean => {
    if (!PAID_TOOLS.includes(toolId)) return true;
    if (!credits) return false;
    return credits.plan !== 'free';
  }, [credits]);

  // Check if a tool is locked for the current user
  const isToolLocked = useCallback((toolId: string): boolean => {
    return PAID_TOOLS.includes(toolId) && credits?.plan === 'free';
  }, [credits]);

  return {
    credits,
    usage,
    loading,
    refreshCredits,
    canAccessTool,
    isToolLocked,
  };
}
