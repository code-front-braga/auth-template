import { AuthRoutes } from '../enums/auth-routes';
import { CustomAuthLink } from './custom-auth-link';

export function AuthRoutesContent() {
	return (
		<div className="flex w-full max-w-[450px] flex-col items-center rounded-t-2xl border-t-2 p-2 pt-4 md:w-1/2 md:rounded-none md:border-0">
			<h3 className="mb-6 font-semibold text-[#fafafa] md:text-center md:text-3xl">
				Seja Bem-Vindo(a) à <span className="font-lexend text-[#7f22fe]">Nome da Empresa</span>!
			</h3>
			<div className="flex w-full items-center justify-between gap-6 md:max-w-[250px] md:flex-col">
				<CustomAuthLink href={AuthRoutes.SIGN_IN} title="Entrar" />
				<CustomAuthLink href={AuthRoutes.SIGN_UP} title="Cadastrar" />
			</div>
		</div>
	);
}
