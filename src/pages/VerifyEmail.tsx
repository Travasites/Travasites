import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import blueforgeLogoIcon from '@/assets/blueforge-logo-icon.png';

export default function VerifyEmail() {
  usePageMeta({
    title: 'Email Verification | Blue Forge',
    description: 'Verify your email address to access Blue Forge.',
  });

  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      // Check if this is a callback from email verification
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const type = searchParams.get('type');

      if (type === 'signup' || type === 'email_change' || (accessToken && refreshToken)) {
        // User clicked verification link
        try {
          if (accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (error) throw error;
          }
          setStatus('success');
        } catch {
          setStatus('error');
        }
      } else {
        // Check if user is logged in but email not verified
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || null);
          if (user.email_confirmed_at) {
            setStatus('success');
          } else {
            setStatus('pending');
          }
        } else {
          setStatus('pending');
        }
      }
    };

    checkVerificationStatus();
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: 'No email found',
        description: 'Please sign in first to resend verification email.',
        variant: 'destructive',
      });
      return;
    }

    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      if (error) throw error;

      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for the verification link.',
      });
    } catch (error: any) {
      toast({
        title: 'Error sending verification',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg" aria-hidden="true" />
      <div className="absolute inset-0 bg-glow" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8 group">
          <img
            src={blueforgeLogoIcon}
            alt="BlueForge Logo"
            className="h-10 w-auto logo-icon-themed logo-hover"
          />
          <span className="text-2xl font-bold group-hover:opacity-90 transition-opacity">
            <span className="text-logo-blue">BLUE </span>
            <span className="text-logo-forge">FORGE</span>
          </span>
        </Link>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8 shadow-elevated border-primary/20 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
              <h1 className="text-2xl font-bold mb-2">Verifying Email...</h1>
              <p className="text-muted-foreground">Please wait while we verify your email address.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
              <p className="text-muted-foreground mb-6">
                Your email has been successfully verified. You now have access to all features.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-accent-gradient">
                  <Link to="/ai-studio">
                    Go to The Forge
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/profile">View Profile</Link>
                </Button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
              <p className="text-muted-foreground mb-6">
                The verification link may have expired or is invalid. Please try again.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full bg-accent-gradient">
                  <Link to="/auth">Sign In Again</Link>
                </Button>
              </div>
            </>
          )}

          {status === 'pending' && (
            <>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-muted-foreground mb-2">
                We've sent a verification link to:
              </p>
              {email && (
                <p className="font-medium text-foreground mb-4">{email}</p>
              )}
              <p className="text-sm text-muted-foreground mb-6">
                Check your inbox and click the link to verify your account.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleResendVerification}
                  disabled={resending || !email}
                  className="w-full bg-accent-gradient"
                >
                  {resending ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 w-4 h-4" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/auth">Back to Sign In</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
