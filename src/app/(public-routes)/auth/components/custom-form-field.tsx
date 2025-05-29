import { Control, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

interface CustomFormFieldProps<T extends FieldValues = FieldValues> {
	fieldControl: Control<T>;
	fieldName: Path<T>;
	formLabel?: string;
	inputType: string;
	ariaLabel?: string;
	autoComplete?: string;
	inputDisabled?: boolean;
	inputPlaceholder: string;
	inputRef?: React.Ref<HTMLInputElement>;
}

export function CustomFormField<T extends FieldValues = FieldValues>({
	fieldControl,
	fieldName,
	formLabel,
	inputType,
	ariaLabel,
	autoComplete,
	inputDisabled = false,
	inputPlaceholder,
	inputRef,
}: CustomFormFieldProps<T>) {
	return (
		<FormField
			control={fieldControl}
			name={fieldName}
			render={({ field }) => (
				<FormItem className="relative">
					<FormLabel>{formLabel}</FormLabel>
					<FormControl>
						<Input
							type={inputType}
							disabled={inputDisabled}
							{...field}
							aria-label={ariaLabel}
							autoComplete={autoComplete}
							placeholder={inputPlaceholder}
							ref={e => {
								field.ref(e);
								if (inputRef) {
									if (typeof inputRef === 'function') {
										inputRef(e);
									} else if (inputRef) {
										(inputRef as React.RefObject<HTMLInputElement | null>).current = e;
									}
								}
							}}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
