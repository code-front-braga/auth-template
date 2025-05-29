import { Gender } from 'generated/prisma';
import { z } from 'zod';

import { SignUpZodMessages } from '@/app/(public-routes)/auth/enums/zod.messages';

export const signUpFormSchema = z
	.object({
		name: z
			.string({ message: 'Nome é obrigatório.' })
			.min(2, { message: 'Mínimo de 2 caracteres.' })
			.max(100, { message: 'Máximo de 100 caracteres.' })
			.trim()
			.transform(value =>
				value
					.toLowerCase()
					.split(' ')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
			),

		email: z
			.string({ message: 'E-mail é obrigatório.' })
			.email({ message: 'E-mail inválido.' })
			.trim()
			.transform(value => value.toLowerCase()),

		phone: z
			.string()
			.min(1, { message: 'Telefone é obrigatório.' })
			.transform(value => value.replace(/\D/g, ''))
			.refine(
				value => {
					return /^\d{10,11}$/.test(value);
				},
				{ message: 'Apenas números.' },
			),

		gender: z.nativeEnum(Gender, {
			errorMap: () => ({ message: 'Gênero inválido. Selecione uma opção válida.' }),
		}),

		password: z
			.string()
			.trim()
			.min(6, { message: SignUpZodMessages.PASSWORD_MIN_ERROR })
			.regex(/[A-Z]/, { message: SignUpZodMessages.PASSWORD_UPPER_CASE_ERROR })
			.regex(/[a-z]/, { message: SignUpZodMessages.PASSWORD_LOWER_CASE_ERROR })
			.regex(/\d/, { message: SignUpZodMessages.PASSWORD_NUMBER_ERROR })
			.regex(/[^A-Za-z0-9]/, { message: SignUpZodMessages.PASSWORD_SPECIAL_CARACTER_ERROR }),

		confirmPassword: z.string({
			message: 'Confirmação de senha é obrigatória.',
		}),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem.',
		path: ['confirmPassword'],
	});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
