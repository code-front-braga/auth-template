import { MdHomeWork } from 'react-icons/md';

import { FormContainer } from '../components/form-container';
import { SignInForm } from './components/sign-in-form';
import { SignInHeader } from './components/sign-in-header';

export default function SignInPage() {
	return (
		<>
			<SignInHeader />
			<FormContainer form={<SignInForm />} icon={MdHomeWork} />
		</>
	);
}
