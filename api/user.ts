import { IProfile } from '@/types/IProfile';
import { fetcher } from '@/utils/fetcher';

export interface ISignInRequest {
  email: string;
  password: string;
  deviceToken?: string;
}

export interface ISignInResponse {
  message: string;
  status: boolean;
}

export async function signIn(data: ISignInRequest) {
  return await fetcher<ISignInResponse>({
    url: '/shop/assistant/login',
    method: 'POST',
    data,
  });
}

export async function getUser() {
  return await fetcher<IProfile>({
    url: '/shop/assistant/profile',
  });
}
