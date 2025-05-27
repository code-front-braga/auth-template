import { z } from 'zod';

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
			.email({ message: 'Formato de E-mail inválido.' })
			.trim()
			.transform(value => value.toLowerCase()),

		phone: z
			.string({ message: 'Telefone é obrigatório.' })
			.min(10, { message: 'Telefone deve ter pelo menos 10 dígitos.' })
			.max(11, { message: 'Telefone deve ter no máximo 11 dígitos.' })
			.transform(value => value.replace(/\D/g, ''))
			.refine(
				value => {
					return /^\d{10,11}$/.test(value);
				},
				{ message: 'Apenas números.' },
			),

		gender: z.string({
			message: 'Gênero é obrigatório.',
		}),

		password: z
			.string({ message: 'Senha é obrigatória.' })
			.min(6, { message: 'Mínimo de 6 caracteres.' })
			.max(12, { message: 'Máximo de 12 caracteres.' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
				message:
					'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
			}),

		confirmPassword: z.string({
			message: 'Confirmação de senha é obrigatória.',
		}),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem.',
		path: ['confirmPassword'],
	});

export type SignUpFormData = z.infer<typeof signUpFormSchema>;
