import { redirect } from 'next/navigation';

import { AuthRoutes } from '@/app/(public-routes)/auth/enums/auth-routes';
import { auth, signOut } from '@/lib/auth/auth';
import { Button } from '@/ui/button';

export default async function DashboardPage() {
	const session = await auth();
	const userName = session?.user.name;

	if (!session) redirect(AuthRoutes.AUTH);

	async function handleSignOut() {
		'use server';
		await signOut();
	}

	return (
		<>
			<h1>Bem-vindo(a) {userName}</h1>
			<form action={handleSignOut}>
				<Button type="submit">Sair</Button>
			</form>
		</>
	);
}
