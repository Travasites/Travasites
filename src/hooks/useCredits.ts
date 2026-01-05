import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserCredits {
  credits_balance: number;
  total_credits_purchased: number;
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

export function useCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [usage, setUsage] = useState<UsageHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCredits();
      fetchUsage();
    } else {
      setCredits(null);
      setUsage([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCredits = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_credits')
      .select('credits_balance, total_credits_purchased')
      .eq('user_id', user.id)
      .single();

    if (!error && data) {
      setCredits(data);
    }
    setLoading(false);
  };

  const fetchUsage = async () => {
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
  };

  const refreshCredits = () => {
    fetchCredits();
    fetchUsage();
  };

  return {
    credits,
    usage,
    loading,
    refreshCredits,
  };
}
