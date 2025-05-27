import { LayoutProps } from '@/interfaces/layout-interface';
import '@/styles/globals.css';

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
