import { AuthHeader } from '../../components/auth-header';
import { CustomFillImage } from '../../components/custom-fill-image';
import { ImageContainer } from '../../components/image-container';

export function SignUpHeader() {
	return (
		<AuthHeader>
			<ImageContainer>
				<CustomFillImage
					src="/sign-up.svg"
					alt="Um homem encostado em um celular grande."
					className="block object-contain"
				/>
			</ImageContainer>
		</AuthHeader>
	);
}
