import NextAuth from 'next-auth';
import { prisma } from '../db/prisma';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [Google({}), GitHub({}), Credentials({})],
	pages: { signIn: '/auth/signin' },
	secret: process.env.AUTH_SECRET,
});
