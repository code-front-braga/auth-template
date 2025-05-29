'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLogIn } from 'react-icons/lu';
import { BeatLoader } from 'react-spinners';
import { toast } from 'sonner';

import { PrivateRoutes } from '@/app/(private-routes)/enums/private-routes-enum';
import { renderSubmitButtonContent } from '@/lib/helpers/render-submit-button-content';
import { SignInFormData, signInFormSchema } from '@/lib/zod/auth/sign-in-zod-schema';
import { Form } from '@/ui/form';

import { CustomDialog } from '../../components/custom-dialog';
import { CustomForm } from '../../components/custom-form';
import { CustomFormField } from '../../components/custom-form-field';
import { CustomSubmitButton } from '../../components/custom-submit-button';
import { AuthMessages } from '../../enums/auth-messages';
import { UIDialog } from '../../enums/ui-dialog';
import { UISubmitButton } from '../../enums/ui-submit-button';
import { signInAction } from '../actions/sign-in-action';

export function SignInForm() {
	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: { email: '', password: '' },
	});
	const {
		control,
		reset,
		setFocus,
		formState: { isSubmitting },
	} = form;

	const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState<boolean>(false);
	const router = useRouter();
	const { push } = router;

	async function handleSignInSubmit(data: SignInFormData) {
		try {
			const response = await signInAction(data);

			if (response.success) {
				setIsSuccessDialogOpen(!isSuccessDialogOpen);
				reset();

				setTimeout(() => {
					setIsSuccessDialogOpen(isSuccessDialogOpen);
					push(PrivateRoutes.DASHBOARD);
				}, 2800);
			} else if (response.error) {
				if (response.error === AuthMessages.INVALID_CREDENTIALS) {
					setFocus('email');
					toast.error(response.error);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Form {...form}>
				<CustomForm form={form} onSubmit={handleSignInSubmit}>
					<CustomFormField
						fieldControl={control}
						fieldName="email"
						formLabel="Seu Email"
						inputType="text"
						inputPlaceholder="email..."
						ariaLabel="Seu Email"
						autoComplete="email"
					/>

					<CustomFormField
						fieldControl={control}
						fieldName="password"
						formLabel="Sua Senha"
						inputType="password"
						inputPlaceholder="senha..."
						ariaLabel="Digite sua Senha"
						autoComplete="current-password"
					/>

					<CustomSubmitButton disabled={isSubmitting}>
						{renderSubmitButtonContent({
							initialText: UISubmitButton.SIGN_IN_INITIAL_TEXT,
							icon: LuLogIn,
							loadingText: UISubmitButton.SIGN_IN_LOADING_TEXT,
							loading: isSubmitting,
							loader: BeatLoader,
						})}
					</CustomSubmitButton>
				</CustomForm>
			</Form>

			<CustomDialog
				title={UIDialog.SIGN_IN_DIALOG_TITLE}
				description={UIDialog.SIGN_IN_DIALOG_DESCRIPTION}
				isSuccessDialogOpen={isSuccessDialogOpen}
			/>
		</>
	);
}
