import '@/styles/globals.css';

import { LayoutProps } from '@/interfaces/layout-interface';

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
