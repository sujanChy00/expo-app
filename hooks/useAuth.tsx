import { Link, useGlobalSearchParams, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';

import { useUser } from './use-user';

type HREF = React.ComponentProps<typeof Link>['href'];

export const useAuthenticated = () => {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!user) {
        router.navigate({
          pathname: '/auth/signin',
          params: {
            redirect: pathname,
          },
        });
      }

      if (user && user.profileDetails.shopAssistantPasswordExpired) {
        router.push('/auth/password-expired');
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [user, router]);
  return { router, user };
};

export const useNotAuthenticated = () => {
  const router = useRouter();
  const { user } = useUser();
  const params = useGlobalSearchParams<{ redirect?: string }>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        if (user.profileDetails.shopAssistantPasswordExpired) {
          router.push('/auth/password-expired');
        } else {
          const redirect = params.redirect || '/';
          router.replace(redirect as HREF);
        }
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [user, router]);

  return { router, user };
};
