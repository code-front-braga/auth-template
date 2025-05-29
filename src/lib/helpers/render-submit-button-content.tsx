import { IconType } from 'react-icons/lib';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

interface ButtonContentProps {
	loading: boolean;
	loader: React.ComponentType<LoaderSizeProps>;
	icon: IconType;
	loadingText: string;
	initialText: string;
}

export function renderSubmitButtonContent({
	loading,
	loader: IconLoader,
	icon: Icon,
	loadingText,
	initialText,
}: ButtonContentProps) {
	if (loading) {
		return (
			<>
				{loadingText} <IconLoader size={6} color="#f2f2f2" />
			</>
		);
	} else {
		return (
			<>
				{initialText} <Icon color="#f2f2f2" />
			</>
		);
	}
}
