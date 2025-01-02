import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const getAuthServer = async () => {
  const session = await getServerSession(authOptions);
  console.log(session, 'session =============');
  return session?.user ?? null;
};
