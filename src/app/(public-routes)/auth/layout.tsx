import { LayoutProps } from '@/interfaces/layout-interface';

export default function AuthLayout({ children }: LayoutProps) {
	return <main className='h-svh w-svw overflow-hidden'>{children}</main>;
}
