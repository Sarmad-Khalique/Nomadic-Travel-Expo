import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('./onboarding'); // Navigate to the onboarding screen after a delay
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
