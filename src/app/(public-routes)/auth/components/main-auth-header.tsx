import { AuthHeader } from './auth-header';
import { CustomFillImage } from './custom-fill-image';
import { ImageContainer } from './image-container';

export function MainAuthHeader() {
	return (
		<AuthHeader>
			<ImageContainer>
				<CustomFillImage
					src="/auth.svg"
					alt="Uma mulher com uma capa de herói."
					className="block rounded-4xl object-contain"
				/>
			</ImageContainer>
		</AuthHeader>
	);
}
