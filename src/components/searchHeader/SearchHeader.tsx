'use client';

import { Controller, Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { Search } from 'lucide-react';
import { ISearchForm } from '../../app/(search)/search.type';

interface ISearchHeaderProps {
   control: Control<ISearchForm>;
   errors: FieldErrors<ISearchForm>;
   handleSubmit: UseFormHandleSubmit<ISearchForm>;
   onSearch: (data: ISearchForm) => void;
   isLoading: boolean;
}

export const SearchHeader = ({ control, errors, handleSubmit, onSearch, isLoading }: ISearchHeaderProps) => {
   return (
      <header className="bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg">
         <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
               Encontre a Vaga dos Seus Sonhos
            </h1>
            <p className="mt-4 text-lg text-indigo-100">Sua próxima carreira de sucesso começa aqui.</p>
            <form onSubmit={handleSubmit(onSearch)} className="mt-8 max-w-2xl mx-auto">
               <div className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden p-2">
                  <Controller
                     name="keywords"
                     control={control}
                     render={({ field }) => (
                        <div className="relative w-full">
                           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                              <Search className="h-5 w-5 text-slate-400" />
                           </div>
                           <input
                              {...field}
                              type="search"
                              placeholder="Cargo, empresa ou tecnologia..."
                              disabled={isLoading}
                              className="w-full bg-transparent pl-12 pr-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-md"
                           />
                        </div>
                     )}
                  />
                  <button
                     type="submit"
                     disabled={isLoading}
                     className="ml-2 flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-full"
                  >
                     {isLoading ? 'Buscando...' : 'Buscar'}
                  </button>
               </div>
               {errors.keywords && (
                  <p className="mt-2 text-sm text-red-300 bg-red-900 bg-opacity-50 px-3 py-1 rounded-md">
                     {errors.keywords.message}
                  </p>
               )}
            </form>
         </div>
      </header>
   );
}; 