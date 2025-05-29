import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt-ts';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { prisma } from '../db/prisma';
import { signInFormSchema } from '../zod/auth/sign-in-zod-schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = signInFormSchema.safeParse(credentials);
				if (!validatedFields.success) return null;

				const { email, password } = validatedFields.data;

				const existingUser = await prisma.user.findUnique({ where: { email } });

				if (!existingUser || !existingUser.password) return null;

				const passwordsMatch = await compare(password, existingUser.password);
				if (!passwordsMatch) return null;

				const { password: hashedPassword, ...safeUser } = existingUser;
				return safeUser;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider !== 'credentials') return true;

			const existingUser = await prisma.user.findUnique({ where: { email: user.email ?? '' } });
			if (!existingUser) return false;

			return true;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			const existingUser = await prisma.user.findFirst({ where: { id: token.sub } });
			if (!existingUser) return token;

			const existingAccount = await prisma.account.findFirst({ where: { userId: existingUser.id } });

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.picture = existingUser.image;

			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
					isOAuth: token.isOAuth,
				},
			};
		},
	},
	pages: { signIn: '/auth/sign-in' },
	secret: process.env.AUTH_SECRET,
});
