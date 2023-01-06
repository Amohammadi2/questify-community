import { useEffect, useState } from 'react';
import { useIsUsernameFree } from './graphql/check-is-username-free.mutation';
import { IValidationResult } from './validation-result.interface';


export const useValidateUsername = (username: string): IValidationResult => {
  const { checkIsUsernameFree, ...states } = useIsUsernameFree(username);
  const [tiemoutId, setTimeoutId] = useState<any>();

  useEffect(() => { // revalidate on username changes
    clearTimeout(tiemoutId);
    if (username != null)
      setTimeoutId(setTimeout(() => {
        checkIsUsernameFree();
      }, 800))
  }, [username]);

  return {
    isValid: states.data,
    pending: states.loading,
    errors: [!states.data ? 'این نام کاربری قبلا استفاده شده است' : null].filter(v=>v!=null)
  };
}