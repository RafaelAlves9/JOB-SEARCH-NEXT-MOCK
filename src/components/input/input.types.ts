import type { EMask } from '@enums/EMask';
import type { ReactElement } from 'react';

export type InputTypes = {
   control: any;
   name: string;
   errors: any;
   label?: string;
   required?: boolean;
   disabled?: boolean;
   placeholder?: string;
   type?: string;
   maxLength?: number;
   height?: string;
   iconLeft?: ReactElement;
   iconRight?: ReactElement;
   iconRightSecondary?: ReactElement;
   onBlur?: () => void;
   onChange?: (event: any) => void;
   mask?: EMask;
   id?: string;
   className?: string;
};
