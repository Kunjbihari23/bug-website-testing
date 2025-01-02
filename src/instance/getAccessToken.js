'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getAccessToken = async () => {
  const session = await getServerSession(authOptions);
  if (session) return session.user.token;

  return '';
};
