import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession as getNextAuthServerSession } from 'next-auth';

export async function getSSRSession(args = []) {
  const session = await getNextAuthServerSession(...args, authOptions);
  console.log(session, 'session', !!session);
  return {
    isLoggedIn: !!session,
    user: session?.user,
  };
}
