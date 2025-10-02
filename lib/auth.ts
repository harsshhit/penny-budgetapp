import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@/lib/db';
import { UserModel } from '@/lib/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      if (user?.email) {
        await UserModel.updateOne(
          { email: user.email },
          { $setOnInsert: { email: user.email }, $set: { name: user.name, image: user.image } },
          { upsert: true }
        );
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.name = user.name || token.name;
        token.email = user.email || token.email;
        token.picture = (user as any).image || token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string | null;
        session.user.email = token.email as string | null;
        (session.user as any).image = token.picture as string | null;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
};

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email || !(session.user as any).id) {
    return null;
  }
  return { session, userId: (session.user as any).id as string };
}


