import API from '@/instance/api';
import instance from '@/instance/instance';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 24 * 60 * 60 * 7,
  },
  pages: {
    signIn: '/',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: {},
        userName: {},
        phoneNumber: {},
        userType: {},
        email: {},
        profileImage: {},
        token: '',
      },
      async authorize(credentials) {
        console.log(credentials, 'credentials=>>>>>');
        return credentials;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log(user, 'user=>>>>>>>>>');
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.phoneNumber = user.phoneNumber;
        token.userType = user.userType;
        token.email = user.email;
        token.profileImage = user.profileImage;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log(session, token, 'session=>>>>>>>>>');
      if (token && session.user) {
        session.user.id = token.id;
        session.user.userName = token.userName;
        session.user.phoneNumber = token.phoneNumber;
        session.user.userType = token.userType;
        session.user.email = token.email;
        session.user.token = token.token;

        if (token.profileImage) {
          session.user.profileImage = token.profileImage;
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
