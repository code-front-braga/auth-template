import '@/styles/globals.css';

import { LayoutProps } from '@/interfaces/layout-interface';
import { inter } from '@/lib/fonts/fonts';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/ui/sonner';

export default function RootLayout({ children }: LayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={` ${inter.className} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}

					<Toaster richColors position="top-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
