import Link from 'next/link';
import { IoArrowUndoSharp } from 'react-icons/io5';

interface BackLinkProps {
	href: string;
	linkClassName: string;
	title: string;
}

export function BackLink({ href, linkClassName, title }: BackLinkProps) {
	return (
		<Link href={href} prefetch className={linkClassName}>
			<IoArrowUndoSharp size={22} color="#7f22fe" />
			{title}
		</Link>
	);
}
