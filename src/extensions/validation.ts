import { replaceStringToOnlyNumber } from 'src/utils/formatedString';

export const validateCNPJ = (document: string): boolean => {
   document = document.replace(/[^\d]+/g, '');

   if (document === '') return false;
   if (document.length !== 14) return false;

   if (/^(\d)\1+$/.test(document)) return false;

   let size = document.length - 2;
   let numbers: any = document.substring(0, size);
   let digits = document.substring(size);
   let sum = 0;
   let pos = size - 7;

   for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
   }

   let result: any = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   if (result != digits.charAt(0)) return false;

   size = size + 1;
   numbers = document.substring(0, size);
   sum = 0;
   pos = size - 7;
   for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
   }

   result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
   if (result != digits.charAt(1)) return false;

   return true;
};

export const validateCPF = (cpf: string): boolean => {
   cpf = cpf.replace(/[^\d]+/g, '');

   if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

   let sum = 0;
   let remainder;

   for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
   }

   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf.substring(9, 10))) return false;

   sum = 0;
   for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
   }

   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf.substring(10, 11))) return false;

   return true;
};

export const validateCellPhone = (cellPhone: string): boolean => {
   const cell = replaceStringToOnlyNumber(cellPhone);
   return cell.length === 11 || cell.length === 10;
};

export const validateCep = (cep: string): boolean => {
   cep = replaceStringToOnlyNumber(cep);
   return cep.length === 8;
};

export const validateOptionOrMin2 = (text: string | null): boolean => {
   return text === null || text.length === 0 || text.length >= 2;
};
