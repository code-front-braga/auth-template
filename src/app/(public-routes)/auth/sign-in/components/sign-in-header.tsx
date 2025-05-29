import { AuthHeader } from '../../components/auth-header';
import { CustomFillImage } from '../../components/custom-fill-image';
import { ImageContainer } from '../../components/image-container';

export function SignInHeader() {
	return (
		<AuthHeader>
			<ImageContainer>
				<CustomFillImage
					src="/sign-in.svg"
					alt="Um homem encostado em um celular grande."
					className="block object-contain"
				/>
			</ImageContainer>
		</AuthHeader>
	);
}
