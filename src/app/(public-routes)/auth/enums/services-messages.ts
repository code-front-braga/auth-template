export enum AuthMessages {
	INVALID_SIGNUP_DATA = 'Dados de cadastro inválidos.',
	PASSWORDS_DO_NOT_MATCH = 'As senhas não conferem.',
	EMAIL_ALREADY_EXISTS = 'Email já cadastrado.',
	USER_CREATED_SUCCESS = 'Usuário cadastrado com sucesso!',
	UNEXPECTED_SIGNUP_ERROR = 'Erro inesperado ao cadastrar o usuário.',
	INVALID_ACCESS_CODE = 'Código de acesso inválido',

	INVALID_SIGNIN_DATA = 'Dados de entrada inválidos.',
	USER_NOT_FOUND = 'Usuário não encontrado em nosso sistema.',
	INVALID_CREDENTIALS = 'Credenciais inválidas.',
	USER_SIGNED_IN_SUCCESS = 'Usuário logado com sucesso!',
	AUTH_ERROR_DEFAULT = 'Erro de autenticação. Verifique seus dados.',
}
