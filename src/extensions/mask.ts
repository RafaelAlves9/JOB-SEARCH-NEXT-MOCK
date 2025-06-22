import { EMask } from '@enums/EMask';

type TRegexDicionary = {
   regex: RegExp;
   replace: string;
   maxLength: number;
};

const regexMask: Record<EMask, TRegexDicionary> = {
   [EMask.CPF]: {
      regex: /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/,
      replace: '$1.$2.$3-$4',
      maxLength: 11,
   },
   [EMask.CNPJ]: {
      regex: /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/,
      replace: '$1.$2.$3/$4-$5',
      maxLength: 14,
   },
   [EMask.CEP]: {
      regex: /^(\d{0,5})(\d{0,3})$/,
      replace: '$1-$2',
      maxLength: 8,
   },
   [EMask.PHONE]: {
      regex: /^(\d{0,4})(\d{0,4})(\d{0,4})$/,
      replace: '($1) $2-$3',
      maxLength: 11,
   },
   [EMask.PHONE_NO_DDD]: {
      regex: /^(\d{0,5})(\d{0,4})$/,
      replace: '$1-$2',
      maxLength: 9,
   },
};

export const useMask = (text: string | null | undefined, mask: EMask): string => {
   if (!text) return '';
   let maskValues = regexMask[mask];
   if (!maskValues) return text;
   const { regex, replace, maxLength } = maskValues;
   let cleanedText = text.replace(/\D/g, '');
   cleanedText = cleanedText.slice(0, maxLength);
   return cleanedText.replace(regex, replace).replace(/[\.\-\/]+$/, '');
};
