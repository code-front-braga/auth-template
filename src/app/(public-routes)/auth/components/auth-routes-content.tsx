'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io';

import { PrivateRoutes } from '@/app/(private-routes)/enums/private-routes-enum';
import { Button } from '@/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card';
import { Separator } from '@/ui/separator';

import { AuthRoutes } from '../enums/auth-routes';
import { CustomAuthLink } from './custom-auth-link';

export function AuthRoutesContent() {
	function handleGoogleSignIn() {
		signIn('google', { redirectTo: PrivateRoutes.DASHBOARD });
	}

	function handleGitHubSignIn() {
		signIn('github', { redirectTo: PrivateRoutes.DASHBOARD });
	}

	return (
		<div className="flex w-full max-w-[450px] flex-col items-center rounded-t-2xl border-t-2 p-2 pt-4 md:w-1/2 md:rounded-none md:border-0">
			<h3 className="md:mb8 mb-6 text-center font-semibold text-[#fafafa] md:text-3xl">
				Olá, Seja <span className="font-lexend text-[#7f22fe]">Bem-Vindo(a)</span>!
			</h3>
			<div className="flex w-full items-center justify-between gap-6 md:max-w-[250px] md:flex-col">
				<CustomAuthLink href={AuthRoutes.SIGN_IN} title="Entrar" />
				<CustomAuthLink href={AuthRoutes.SIGN_UP} title="Cadastrar" />
			</div>

			<div className="relative mt-8 w-full">
				<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030712] px-2 text-xs">
					Ou
				</span>
				<Separator />
			</div>

			<Card className="mt-8 w-full">
				<CardHeader>
					<CardTitle className="text-center text-sm text-[#7f22fe]">Entre com uma conta existente</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Button
						onClick={handleGoogleSignIn}
						variant="outline"
						className="flex items-center justify-between text-gray-500 dark:hover:bg-gray-200 dark:hover:text-black"
					>
						Google
						<FcGoogle />
					</Button>
					<Button
						onClick={handleGitHubSignIn}
						variant="outline"
						className="flex items-center justify-between dark:bg-black dark:hover:text-black"
					>
						GitHub
						<IoLogoGithub />
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
