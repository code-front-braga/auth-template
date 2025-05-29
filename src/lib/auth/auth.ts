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
			if (account?.provider !== 'credentials') {
				const existingUser = await prisma.user.findUnique({ where: { email: user.email ?? '' } });
				if (!existingUser) {
					return false;
				}
				return true;
			}

			return true;
		},
		async jwt({ token, user, account }) {
			// O objeto 'user' é preenchido aqui APENAS na primeira vez que o token é criado (login)
			if (account?.provider === 'credentials' && user) {
				token.id = user.id; // Garanta que o id do user está no token.sub se não estiver
				token.name = user.name;
				token.email = user.email;
				token.isOAuth = false; // explicitly false for credentials
			} else if (account?.provider !== 'credentials' && account) {
				// Lógica para OAuth
				token.isOAuth = true;
			}
			// O restante da lógica de busca do usuário do prisma para preencher o token
			// é boa para garantir que o token esteja atualizado com os dados do DB a cada requisição
			if (!token.sub) return token; // Se sub não está definido, não há user logado (shouldn't happen often)

			const existingUser = await prisma.user.findFirst({ where: { id: token.sub } });
			if (!existingUser) return token; // User não encontrado no DB

			// Você pode refatorar essa parte para ser mais eficiente
			// Aqui, apenas atualiza as propriedades do token com base no user do DB
			token.name = existingUser.name;
			token.email = existingUser.email;
			token.picture = existingUser.image;
			// Garanta que o isOAuth seja definido corretamente se não tiver sido na primeira vez (user, account)
			const existingAccount = await prisma.account.findFirst({
				where: { userId: existingUser.id, provider: { not: 'credentials' } },
			});
			token.isOAuth = !!existingAccount;

			return token;
		},
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
				session.user.name = token.name ?? '';
				session.user.email = token.email ?? '';
				session.user.image = token.picture ?? '';
				session.user.isOAuth = token.isOAuth as boolean;
			}
			return session;
		},
	},
	pages: { signIn: '/auth/sign-in' },
	secret: process.env.AUTH_SECRET,
});
