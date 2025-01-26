import { useState } from 'react';
import { signUp, confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

interface SignUpInput {
  email?: string;
  phone?: string;
  password: string;
  fullName: string;
}

interface UseSignUpReturn {
  signUpUser: (input: SignUpInput) => Promise<void>;
  confirmUser: (username: string, code: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

export function useSignUp(): UseSignUpReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const signUpUser = async ({ email, phone, password, fullName }: SignUpInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const username = email || phone;
      if (!username) {
        throw new Error('Either email or phone is required');
      }

      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            phone_number: phone,
            name: fullName,
          },
          autoSignIn: true
        }
      });

      if (isSignUpComplete) {
        try {
          const signInResult = await autoSignIn();
          if (signInResult) {
            router.push('/dashboard');
          }
        } catch (autoSignInError) {
          console.error('Auto sign-in failed:', autoSignInError);
          router.push('/login');
        }
      }

    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during sign-up'));
    } finally {
      setLoading(false);
    }
  };

  const confirmUser = async (username: string, code: string) => {
    setLoading(true);
    setError(null);

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username,
        confirmationCode: code
      });

      if (isSignUpComplete) {
        try {
          const signInResult = await autoSignIn();
          if (signInResult) {
            router.push('/dashboard');
          }
        } catch (autoSignInError) {
          console.error('Auto sign-in failed:', autoSignInError);
          router.push('/login');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during confirmation'));
    } finally {
      setLoading(false);
    }
  };

  return {
    signUpUser,
    confirmUser,
    loading,
    error
  };
} 