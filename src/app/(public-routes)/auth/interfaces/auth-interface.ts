import { User } from 'generated/prisma';

import { SignUpFormData } from '@/lib/zod/auth/sign-up-zod-schema';

interface AuthServiceResponse {
	user?: Omit<User, 'password'>;
	success?: string;
	error?: string;
}

export interface AuthServiceInterface {
	signUp: (data: SignUpFormData) => Promise<AuthServiceResponse>;
}
