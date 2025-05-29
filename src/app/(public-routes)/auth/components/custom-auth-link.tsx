import Link from 'next/link';
import { IoArrowRedoSharp } from 'react-icons/io5';

interface CustomAuthLinkProps {
	href: string;
	title: string;
}

export function CustomAuthLink({ href, title }: CustomAuthLinkProps) {
	return (
		<Link
			href={href}
			prefetch
			className="flex flex-1 items-center justify-between gap-4 rounded-2xl bg-[#7f22fe] px-3 py-1 text-[#fafafa] shadow-[0px_4px_8px_#00000045] md:w-full"
		>
			{title}
			<IoArrowRedoSharp />
		</Link>
	);
}
