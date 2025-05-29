'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/lib/auth/auth';
import { SignInFormData } from '@/lib/zod/auth/sign-in-zod-schema';

import { AuthMessages } from '../../enums/auth-messages';

export async function signInAction(data: SignInFormData) {
	try {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		return { success: AuthMessages.USER_SIGNED_IN_SUCCESS };
	} catch (error) {
		console.error('Erro no signInAction:', error);
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: AuthMessages.INVALID_CREDENTIALS };
				default:
					return { error: AuthMessages.AUTH_ERROR_DEFAULT };
			}
		}

		return { error: AuthMessages.UNEXPECTED_SIGNIN_ERROR };
	}
}
