import { FieldValues, UseFormReturn } from 'react-hook-form';

interface CustomFormProps<TFieldValues extends FieldValues> {
	children: React.ReactNode;
	form: UseFormReturn<TFieldValues>;
	onSubmit: (data: TFieldValues) => Promise<void> | void;
	className?: string;
}

export function CustomForm<TFieldValues extends FieldValues>({
	children,
	form,
	onSubmit,
	className,
}: CustomFormProps<TFieldValues>) {
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className={`mt-4 flex h-full w-full max-w-[500px] flex-col gap-6 md:rounded-xl md:border-2 md:p-4 md:shadow-2xl ${className}`}
		>
			{children}
		</form>
	);
}
