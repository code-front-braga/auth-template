import { Button } from '@/ui/button';

interface SubmitButtonProps {
	disabled: boolean;
	children: React.ReactNode;
}

export function CustomSubmitButton({ disabled, children }: SubmitButtonProps) {
	return (
		<Button type="submit" variant="default" disabled={disabled} className="flex items-center justify-between">
			{children}
		</Button>
	);
}
