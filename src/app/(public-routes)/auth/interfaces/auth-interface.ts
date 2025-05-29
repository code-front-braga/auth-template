import { User } from 'generated/prisma';

import { SignUpFormData } from '@/lib/zod/auth/sign-up-zod-schema';

interface SignUpServiceResponse {
	user?: Omit<User, 'password'>;
	success?: string;
	error?: string;
}

export interface SignUpServiceInterface {
	signUp: (data: SignUpFormData) => Promise<SignUpServiceResponse>;
}
