'use server';

import { SignUpFormData } from '@/lib/zod/auth/sign-up-zod-schema';

import { AuthMessages } from '../../enums/services-messages';
import { UserAuthService } from '../../services/user-auth-services';

export async function signUpAction(data: SignUpFormData) {
	try {
		const action = await UserAuthService.signUp(data);

		if (action.error) return { error: action.error };

		return { success: action.success, user: action.user };
	} catch (error) {
		console.error(error);
		return { error: AuthMessages.UNEXPECTED_SIGNUP_ERROR };
	}
}
