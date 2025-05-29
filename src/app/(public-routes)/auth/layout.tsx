import { redirect } from 'next/navigation';

import { PrivateRoutes } from '@/app/(private-routes)/enums/private-routes-enum';
import { LayoutProps } from '@/interfaces/layout-interface';
import { auth } from '@/lib/auth/auth';

import { AuthFooter } from './components/auth-footer';
import { AuthSection } from './components/auth-section';

export default async function AuthLayout({ children }: LayoutProps) {
	const session = await auth();
	if (session) redirect(PrivateRoutes.DASHBOARD);

	return (
		<main className="flex h-svh w-svw flex-col overflow-hidden p-2">
			<AuthSection>{children}</AuthSection>
			<AuthFooter />
		</main>
	);
}
