import { z } from 'zod';

import { SignInZodMessages } from '@/app/(public-routes)/auth/enums/zod.messages';

export const signInFormSchema = z.object({
	email: z
		.string()
		.email({ message: SignInZodMessages.EMAIL_ERROR })
		.trim()
		.transform(value => value.toLowerCase()),

	password: z.string({ message: 'Senha é obrigatória.' }).min(6, { message: SignInZodMessages.PASSWORD_ERROR }).trim(),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
