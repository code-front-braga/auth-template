import { IconType } from 'react-icons/lib';

interface FormContainerProps {
	form: React.ReactNode;
	icon: IconType;
}

export function FormContainer({ form, icon: Icon }: FormContainerProps) {
	return (
		<div className="flex flex-col items-center rounded-t-2xl border-t-2 p-2 pt-4 md:w-1/2 md:rounded-none md:border-0">
			<Icon size={40} className="hidden text-[#7f22fe] md:block md:h-[60px] md:w-[60px]" />
			{form}
		</div>
	);
}
