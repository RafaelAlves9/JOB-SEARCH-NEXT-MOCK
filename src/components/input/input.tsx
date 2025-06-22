'use client';

import { Controller } from 'react-hook-form';
import type { InputTypes } from './input.types';
import { useEffect, useState } from 'react';

const Input = ({
   control,
   name,
   label,
   errors,
   disabled,
   placeholder,
   type,
   maxLength = 200,
   required,
   iconLeft,
   iconRight,
   iconRightSecondary,
   onBlur,
   mask,
   onChange: onChangeProps,
   id,
   className,
}: InputTypes) => {
   const [inputType, setInputType] = useState<string>('');
   const [inputValue, setInputValue] = useState<string>('');

   const renderIconRightSecondary = () => {
      if (inputType === 'password') {
         return iconRightSecondary;
      } else return iconRight;
   };

   const handleErrorName = () => {
      const fieldName = name;
      const [object, property] = fieldName.split('.');
      if (!!property) return errors[object]?.[property];
      return errors[object];
   };

   const handleChangeInputType = () => {
      setInputType(inputType === 'password' ? 'text' : 'password');
   };

   useEffect(() => {
      setInputType(type ?? 'text');
   }, [type]);

   return (
      <div className="w-full flex flex-col justify-start items-start gap-2 relative">
         {!!label && (
            <label className="font-[400] text-sm h-4 text-[#404040]">
               {label}
               <strong className="text-primary-500">{required ? '*' : ''}</strong>
            </label>
         )}
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
               <>
                  {!!iconLeft && (
                     <div
                        className={`text-2xl absolute left-3 ${
                           !!label ? 'top-[2.2rem]' : 'top-[1.8rem]'
                        } rounded-[0.7em] z-10`}
                     >
                        {iconLeft}
                     </div>
                  )}
                  {!!iconRight && (type !== 'password' || inputType === 'password') && (
                     <div
                        className={`text-2xl absolute right-4 ${!!label ? 'top-[2rem]' : 'top-2'} rounded-[0.7em] z-10`}
                        onClick={() => {
                           if (type === 'password') {
                              handleChangeInputType();
                           }
                        }}
                     >
                        {iconRight}
                     </div>
                  )}

                  {!!iconRightSecondary && inputType === 'text' && (
                     <div
                        className={`text-2xl absolute right-4 ${
                           !!label ? 'top-[2rem]' : 'top-2'
                        } rounded-[0.7em] z-10 cursor-pointer`}
                        onClick={() => handleChangeInputType()}
                     >
                        {iconRightSecondary}
                     </div>
                  )}

                  <input
                     className={`w-full h-[2.50rem] rounded-[8px] border border-gray-300 outline-none py-2 px-4 text-neutral-800 text-[.95rem] font-[300]
                ${iconLeft ? 'pl-10' : 'pl-4'}
                ${iconRightSecondary || iconRight ? 'pr-12' : 'pr-4'}
                ${!disabled && 'hover:border-primary-300 focus:border-primary-300 bg-white'}
                ${disabled && 'bg-gray-lightest'} ${className}`}
                     id={id}
                     value={value}
                     onChange={(e: any) => {
                        const text = e.target.value;
                        setInputValue(text);
                        onChange(text);
                        onChangeProps && onChangeProps(text);
                     }}
                     disabled={disabled}
                     type={inputType}
                     placeholder={placeholder}
                     onBlur={onBlur}
                     maxLength={maxLength}
                  />
                  {handleErrorName() && (
                     <span className="w-full p-0 text-red-500 text-sm" id={`${id}-error`}>
                        {handleErrorName().message}
                     </span>
                  )}
               </>
            )}
         />
      </div>
   );
};

export default Input;
