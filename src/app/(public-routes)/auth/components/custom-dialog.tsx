import Image from 'next/image';

import { Dialog, DialogContent, DialogTitle } from '@/ui/dialog';

interface CustomDialogProps {
	isSuccessDialogOpen: boolean;
	title: string;
	description: string;
}

export function CustomDialog({ isSuccessDialogOpen, title, description }: CustomDialogProps) {
	return (
		<Dialog open={isSuccessDialogOpen}>
			<DialogTitle></DialogTitle>
			<DialogContent>
				<div className="items flex flex-col items-center justify-center">
					<Image
						src="/new_user.gif"
						alt="Animação de um rosto em formato de ícone."
						unoptimized
						width={55}
						height={55}
					/>
					<p className="text mt-4 text-center font-semibold text-[#7f22fe]">{title}</p>
					<p className="text-center text-sm text-[#7f22fe]">{description}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
}
