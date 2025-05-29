import { hash } from 'bcrypt-ts';
import { Gender } from 'generated/prisma';

import { prisma } from '@/lib/db/prisma';
import { signUpFormSchema } from '@/lib/zod/auth/sign-up-zod-schema';

import { AuthMessages } from '../enums/auth-messages';
import { SignUpServiceInterface } from '../interfaces/auth-interface';

export const UserSignUpService: SignUpServiceInterface = {
	async signUp(data) {
		try {
			const validatedFields = signUpFormSchema.safeParse(data);
			if (!validatedFields.success) return { error: AuthMessages.INVALID_SIGNUP_DATA };

			const { name, email, phone, gender, password, confirmPassword } = validatedFields.data;

			const isPasswordsMatch = password === confirmPassword;
			if (!isPasswordsMatch) return { error: AuthMessages.PASSWORDS_DO_NOT_MATCH };

			const hashedPassword = await hash(password, 12);

			const existingUser = await prisma.user.findUnique({ where: { email } });
			if (existingUser) return { error: AuthMessages.EMAIL_ALREADY_EXISTS };

			const formattedEmail = email.toLowerCase().trim();

			const newUser = await prisma.user.create({
				data: {
					name,
					email: formattedEmail,
					phone,
					password: hashedPassword,
					gender: gender as Gender,
				},
			});

			const { password: _, ...safeUser } = newUser;

			return { success: AuthMessages.USER_CREATED_SUCCESS, user: safeUser };
		} catch (error) {
			console.error(error);
			return { error: `${AuthMessages.UNEXPECTED_SIGNUP_ERROR} ${error}` };
		}
	},
};
