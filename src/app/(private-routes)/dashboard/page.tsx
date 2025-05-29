import { redirect } from 'next/navigation';

import { AuthRoutes } from '@/app/(public-routes)/auth/enums/auth-routes';
import { auth } from '@/lib/auth/auth';

export default async function DashboardPage() {
	const session = await auth();
	const userName = session?.user.name;

	if (!session) redirect(AuthRoutes.AUTH);

	return <h1>Bem-vindo(a) {userName}</h1>;
}
