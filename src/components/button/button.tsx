'use client';

import { useState, ReactNode } from 'react';
import { ButtonTypes, ButtonVariant, ButtonSize } from './button.types';
import clsx from 'clsx';

const Button = ({
   onClick,
   description,
   type = 'button',
   id,
   variant = ButtonVariant.Primary,
   size = ButtonSize.Normal,
   icon,
   disabled = false,
   className,
   children,
}: ButtonTypes & { children?: ReactNode }) => {
   const [isPendent, setIsPendent] = useState<boolean>(false);

   const buttonStyles = clsx(
      className,
      'flex items-center justify-center rounded-md border font-medium transition-all relative cursor-pointer',
      'disabled:opacity-50 disabled:cursor-not-allowed',

      // Variantes
      {
         // Primary Solid
         'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 active:bg-primary-800':
            variant === ButtonVariant.Primary && !disabled,

         // Primary Outlined
         'bg-transparent border-primary-500 text-primary-500 hover:bg-primary-100 active:bg-primary-200':
            variant === ButtonVariant.PrimaryOutlined && !disabled,

         // Secondary Solid
         'bg-gray-700 border-gray-700 text-white hover:bg-gray-800 active:bg-gray-900':
            variant === ButtonVariant.Secondary && !disabled,

         // Secondary Outlined
         'bg-transparent border-gray-700 text-gray-700 hover:bg-gray-100 active:bg-gray-200':
            variant === ButtonVariant.SecondaryOutlined && !disabled,
      },

      // Tamanhos
      {
         'h-12 px-6 text-base': size === ButtonSize.Large,
         'h-10 px-5 text-sm': size === ButtonSize.Normal,
         'h-8 px-4 text-xs': size === ButtonSize.Small,
      },
   );

   const handleOnClick = async () => {
      if (!onClick) return;

      setIsPendent(true);

      const result: any = onClick();

      if (result instanceof Promise) {
         await result.finally(() => {
            setIsPendent(false);
         });
      } else {
         setIsPendent(false);
      }
   };

   return (
      <button
         type={type}
         onClick={handleOnClick}
         data-cy={id ?? ''}
         disabled={disabled || isPendent}
         className={buttonStyles}
      >
         {isPendent ? (
            <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-md">
               <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
            </div>
         ) : (
            <>
               {icon && <span className="mr-2">{icon}</span>}
               {children ? children : description && <span>{description}</span>}
            </>
         )}
      </button>
   );
};

export default Button;
