'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMask } from '@react-input/mask';
import { Gender } from 'generated/prisma';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa6';
import { BeatLoader } from 'react-spinners';

import { renderSubmitButtonContent } from '@/lib/helpers/render-submit-button-content';
import { SignUpFormData, signUpFormSchema } from '@/lib/zod/auth/sign-up-zod-schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

import { CustomDialog } from '../../components/custom-dialog';
import { CustomForm } from '../../components/custom-form';
import { CustomFormField } from '../../components/custom-form-field';
import { CustomSubmitButton } from '../../components/custom-submit-button';
import { AuthMessages } from '../../enums/auth-messages';
import { AuthRoutes } from '../../enums/auth-routes';
import { UIDialog } from '../../enums/ui-dialog';
import { UISubmitButton } from '../../enums/ui-submit-button';
import { signUpAction } from '../actions/sign-up-action';

const genderOptions = [
	{ value: Gender.WOMAN, label: 'Mulher' },
	{ value: Gender.MAN, label: 'Homem' },
	{ value: Gender.NON_BINARY, label: 'Não-Binário' },
	{ value: Gender.PREFER_NOT_TO_SAY, label: 'Prefiro não dizer' },
	{ value: Gender.TRANSGENDER_WOMAN, label: 'Mulher Transgênero' },
	{ value: Gender.TRANSGENDER_MAN, label: 'Homem Transgênero' },
	{ value: Gender.GENDERQUEER, label: 'Gênero Queer' },
	{ value: Gender.GENDERFLUID, label: 'Gênero Fluido' },
	{ value: Gender.AGENDER, label: 'Agênero' },
	{ value: Gender.DEMIGIRL, label: 'Demimenina' },
	{ value: Gender.DEMIBOY, label: 'Demimenino' },
	{ value: Gender.TWO_SPIRIT, label: 'Dois-Espíritos' },
];

export function SignUpForm() {
	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			gender: Gender.PREFER_NOT_TO_SAY,
			password: '',
			confirmPassword: '',
		},
	});
	const {
		reset,
		control,
		setFocus,
		formState: { isSubmitting },
	} = form;

	const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState<boolean>(false);
	const [existingEmailAlreadyError, setExistingEmailAlreadyError] = useState<string>('');
	const router = useRouter();
	const { push } = router;

	const inputPhoneRef = useMask({
		mask: '(__) _____-____',
		replacement: { _: /\d/ },
	});

	async function handleSignUpSubmit(data: SignUpFormData) {
		try {
			const response = await signUpAction(data);

			if (response.success) {
				setIsSuccessDialogOpen(!isSuccessDialogOpen);
				reset();

				setTimeout(() => {
					setIsSuccessDialogOpen(isSuccessDialogOpen);
					push(AuthRoutes.SIGN_IN);
				}, 2800);
			} else if (response.error) {
				if (response.error === AuthMessages.EMAIL_ALREADY_EXISTS) {
					setFocus('email');
					setExistingEmailAlreadyError(response.error);
				}
			}
		} catch (error) {
			console.error(AuthMessages.UNEXPECTED_SIGNUP_ERROR, `${error}`);
		}
	}

	return (
		<>
			<Form {...form}>
				<CustomForm form={form} onSubmit={handleSignUpSubmit}>
					<CustomFormField
						fieldControl={control}
						fieldName="name"
						formLabel="Seu Nome"
						inputType="text"
						inputPlaceholder="nome..."
						ariaLabel="Seu Nome"
						autoComplete="name"
					/>

					<div className="relative flex items-center gap-4 md:justify-between">
						<CustomFormField
							fieldControl={control}
							fieldName="email"
							formLabel="Seu Email"
							inputType="email"
							inputPlaceholder="email..."
							ariaLabel="Seu Email"
							autoComplete="email"
						/>

						{existingEmailAlreadyError && (
							<p className="absolute top-15 text-xs text-[#e15353] md:top-16 md:text-sm">{existingEmailAlreadyError}</p>
						)}

						<CustomFormField
							fieldControl={control}
							fieldName="phone"
							formLabel="Seu Telefone"
							inputType="tel"
							inputPlaceholder="(XX) XXXXX-XXXX"
							ariaLabel="Seu Telefone"
							inputRef={inputPhoneRef}
						/>
					</div>
					<FormField
						control={form.control}
						name="gender"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Seu Gênero</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione o seu gênero" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{genderOptions.map(option => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<CustomFormField
						fieldControl={control}
						fieldName="password"
						formLabel="Crie uma Senha"
						inputType="password"
						inputPlaceholder="senha..."
						ariaLabel="Crie uma Senha"
						autoComplete="new-password"
					/>

					<CustomFormField
						fieldControl={control}
						fieldName="confirmPassword"
						formLabel="Confirme a Senha"
						inputType="password"
						inputPlaceholder="confirme a senha..."
						ariaLabel="Confirme a Senha"
						autoComplete="new-password"
					/>

					<CustomSubmitButton disabled={isSubmitting}>
						{renderSubmitButtonContent({
							initialText: UISubmitButton.SIGN_UP_INITIAL_TEXT,
							icon: FaUserPlus,
							loadingText: UISubmitButton.SIGN_UP_LOADING_TEXT,
							loading: isSubmitting,
							loader: BeatLoader,
						})}
					</CustomSubmitButton>
				</CustomForm>
			</Form>

			<CustomDialog
				title={UIDialog.SIGN_UP_DIALOG_TITLE}
				description={UIDialog.SIGN_UP_DIALOG_DESCRIPTION}
				isSuccessDialogOpen={isSuccessDialogOpen}
			/>
		</>
	);
}
