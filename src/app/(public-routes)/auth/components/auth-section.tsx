import { LayoutProps } from '@/interfaces/layout-interface';

export function AuthSection({ children }: LayoutProps) {
	return <section className="flex h-full w-full flex-col gap-4 md:flex-row md:items-center md:p-4">{children}</section>;
}
