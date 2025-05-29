import { FaUserCircle } from 'react-icons/fa';

import { FormContainer } from '../components/form-container';
import { SignUpForm } from './components/sign-up-form';
import { SignUpHeader } from './components/sign-up-header';

export default function SignUpPage() {
	return (
		<>
			<SignUpHeader />
			<FormContainer form={<SignUpForm />} icon={FaUserCircle} />
		</>
	);
}
