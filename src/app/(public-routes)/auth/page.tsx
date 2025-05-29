import { AuthRoutesContent } from './components/auth-routes-content';
import { MainAuthHeader } from './components/main-auth-header';

export default function AuthPage() {
	return (
		<>
			<MainAuthHeader />
			<AuthRoutesContent />
		</>
	);
}
