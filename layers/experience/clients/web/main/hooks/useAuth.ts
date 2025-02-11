import { useState, useEffect } from 'react';
import { signIn, signUp, confirmSignIn, signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast/toast-provider';

// Input Types
interface SignInInput {
  username: string;
  password: string;
}

interface SignUpInput {
  email?: string;
  phone?: string;
  password: string;
  fullName: string;
}

interface UseAuthReturn {
  signInUser: (input: SignInInput) => Promise<void>;
  signUpUser: (input: SignUpInput) => Promise<void>;
  answerAuthenticationChallange: (username: string, code: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
  loading: boolean;
  error: Error | null;
  user: {
    username?: string;
    attributes?: {
      name?: string;
      picture?: string;
      email?: string;
    };
  } | null;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [user, setUser] = useState<UseAuthReturn['user']>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch current user on mount
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const userAttributes = await fetchUserAttributes();
        setUser({
          username: currentUser.username,
          attributes: {
            name: userAttributes.name,
            email: userAttributes.email,
            picture: userAttributes.picture,
          }
        });
      } catch (err) {
        console.log('No user found');
      }
    };
    fetchUser();
  }, []);

  const handleError = (err: unknown) => {
    console.log('useAuth error', err);
    const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
    setError(err instanceof Error ? err : new Error(errorMessage));
    toast(errorMessage, { status: 'error', duration: 5000 });
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut();
      router.push('/');
      toast('Successfully signed out', { status: 'success' });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async ({ username, password }: SignInInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const signInOutput = await signIn({
        username,
        password,
        options: {
          authFlowType: 'CUSTOM_WITH_SRP',
        }
      });

      console.log('signInOutput', signInOutput);

      // Handle different next steps
      switch (signInOutput.nextStep.signInStep) {
        case 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE':
          router.push(`/auth/code?username=${encodeURIComponent(username)}`);
          toast('Please verify your identity.', { status: 'info' });
          break;

        default:
            throw new Error('Something went wrong');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async ({ email, phone, password, fullName }: SignUpInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const username = email || phone;
      if (!username) {
        throw new Error('Either email or phone is required');
      }

      const result = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number: phone,
            name: fullName,
          },
        },
      });

      console.log('signUp result', result);

      switch (result.nextStep.signUpStep) {
        case 'DONE':
          await signInUser({ username, password });
          break;

        default:
          throw new Error('Something went wrong');
      }

    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const answerAuthenticationChallange = async (username: string, code: string) => {
    setLoading(true);
    setError(null);

    try {
        const confirm_sign_in_output = await confirmSignIn({ challengeResponse: code });
        console.log('confirm_sign_in_output', confirm_sign_in_output);
        if (confirm_sign_in_output.isSignedIn) {
            toast('Account verified and signed in successfully!', { status: 'success' });
            router.push('/');
        } else if(confirm_sign_in_output.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
            toast('Invalid code. Please try again.', { status: 'error' });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    signInUser,
    signUpUser,
    answerAuthenticationChallange,
    handleSignOut,
    loading,
    error,
    user
  };
} 