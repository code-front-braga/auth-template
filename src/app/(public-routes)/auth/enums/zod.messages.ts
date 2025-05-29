export enum SignUpZodMessages {
	NAME_MIN_ERROR = 'Deve ter pelo menos 2 caracteres.',
	NAME_MAX_ERROR = 'Não pode ser acima de 100 caracteres.',
	EMAIL_ERROR = 'Formato inválido.',
	PASSWORD_MIN_ERROR = 'A senha deve ter pelo menos 6 caracteres.',
	PASSWORD_UPPER_CASE_ERROR = 'Deve conter uma letra maiúscula.',
	PASSWORD_LOWER_CASE_ERROR = 'Deve conter uma letra minúscula.',
	PASSWORD_NUMBER_ERROR = 'Deve conter um número.',
	PASSWORD_SPECIAL_CARACTER_ERROR = 'Deve conter um caracter especial.',
	CONFIRM_PASSWORD_ERROR = 'As senhas não são iguais.',
	ACCESS_CODE_ERROR = 'Código de acesso inválido.',
}

export enum SignInZodMessages {
	EMAIL_ERROR = 'Formato de email inválido.',
	PASSWORD_ERROR = 'Mínimo de 6 caracteres',
}
