'use client';

import { usePathname } from 'next/navigation';

import { AuthRoutes } from '../enums/auth-routes';
import { BackLink } from './back-link';

export function AuthHeader({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<header className="relative w-full flex-auto md:flex md:h-full md:w-1/2 md:flex-col md:p-4">
			{pathname !== AuthRoutes.AUTH && (
				<BackLink
					href={AuthRoutes.AUTH}
					title="voltar"
					linkClassName="absolute top-0 z-10 flex items-center gap-1.5 text-sm font-semibold"
				/>
			)}
			{children}
		</header>
	);
}
