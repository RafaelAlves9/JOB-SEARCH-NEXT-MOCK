'use client';

import { IJobSearchViewModel } from './job-search.type';
import { SkeletonLoader } from '@components/skeletonLoader/skeletonLoader';
import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import { Building2, MapPin, Clock, Search, Briefcase } from 'lucide-react';
import { Controller } from 'react-hook-form';

export const JobSearchView = ({ viewModel }: { viewModel: IJobSearchViewModel }) => {
   const {
      control,
      errors,
      handleSubmit,
      onSearch,
      isLoading,
      jobs,
      totalResults,
      loadMore,
      hasMore,
      isFetchingMore,
   } = viewModel;

   const observer = useRef<IntersectionObserver | null>(null);
   const lastJobElementRef = useCallback(
      (node: HTMLDivElement) => {
         if (isLoading) return;
         if (observer.current) observer.current.disconnect();

         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
               loadMore();
            }
         });

         if (node) observer.current.observe(node);
      },
      [isLoading, hasMore, isFetchingMore, loadMore]
   );

   return (
      <div className="min-h-screen bg-slate-50 text-slate-800">
         <header className="bg-gradient-to-r from-sky-500 to-indigo-600 shadow-lg">
            <div className="container mx-auto px-4 py-16 text-center">
               <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Encontre a Vaga dos Seus Sonhos
               </h1>
               <p className="mt-4 text-lg text-indigo-100">
                  Sua próxima carreira de sucesso começa aqui.
               </p>
               <form
                  onSubmit={handleSubmit(onSearch)}
                  className="mt-8 max-w-2xl mx-auto"
               >
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

         <main className="container mx-auto px-4 py-10">
            {isLoading && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
               </div>
            )}

            {!isLoading && jobs.length > 0 && (
               <h2 className="text-2xl font-bold mb-6">
                  {totalResults > 0 ? `${totalResults} vagas encontradas` : 'Resultados da busca'}
               </h2>
            )}

            {!isLoading && jobs.length === 0 && (
               <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full mb-6">
                     <Briefcase size={40} className="text-sky-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                     Nenhuma vaga encontrada
                  </h2>
                  <p className="text-slate-500 max-w-md mx-auto">
                     Tente usar palavras-chave diferentes ou mais abrangentes para encontrar sua vaga ideal.
                  </p>
               </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {jobs.map((job, index) => {
                  const isLastElement = jobs.length === index + 1;
                  return (
                     <JobCard
                        key={`${job.jobUrl}-${index}`}
                        job={job}
                        ref={isLastElement ? lastJobElementRef : undefined}
                     />
                  );
               })}
            </div>

            {isFetchingMore && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  {[...Array(3)].map((_, i) => <SkeletonCard key={`loading-${i}`} />)}
               </div>
            )}
         </main>
      </div>
   );
};

// Componente de Card de Vaga Refatorado
const JobCard = React.forwardRef<HTMLDivElement, { job: IJobViewModel['jobs'][0] }>(({ job }, ref) => (
   <div ref={ref} className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6">
         <div className="flex items-start mb-4">
            <div className="w-16 h-16 flex-shrink-0 mr-5 bg-slate-100 rounded-xl flex items-center justify-center">
               {job.companyLogo ? (
                  <Image
                     src={job.companyLogo}
                     alt={`${job.company} logo`}
                     width={64}
                     height={64}
                     className="object-contain w-full h-full p-2 rounded-xl"
                  />
               ) : (
                  <Building2 className="text-slate-400" size={32} />
               )}
            </div>
            <div className="flex-1">
               <p className="text-slate-500 text-sm">{job.company}</p>
               <h3 className="text-lg font-bold text-slate-800 mt-1 line-clamp-2 leading-tight">
                  {job.position}
               </h3>
            </div>
         </div>
         {job.salary && (
            <p className="text-md font-semibold text-emerald-600 mb-3">{job.salary}</p>
         )}
      </div>
      <div className="border-t border-slate-100 mt-auto p-6 space-y-3">
         <div className="flex items-center text-sm text-slate-500">
            <MapPin size={16} className="mr-3 flex-shrink-0 text-slate-400" />
            <span className="truncate">{job.location}</span>
         </div>
         <div className="flex items-center text-sm text-slate-500">
            <Clock size={16} className="mr-3 flex-shrink-0 text-slate-400" />
            <span>{job.agoTime || job.date}</span>
         </div>
         <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg py-2 mt-4 transition-colors duration-300">
            Ver detalhes
         </a>
      </div>
   </div>
));

JobCard.displayName = 'JobCard';

// Componente de Skeleton para Loading
const SkeletonCard = () => (
   <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6">
      <div className="flex items-start mb-4">
         <div className="w-16 h-16 flex-shrink-0 mr-5 bg-slate-100 rounded-xl animate-pulse"></div>
         <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-full animate-pulse"></div>
         </div>
      </div>
      <div className="space-y-3 mt-auto pt-6">
         <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
         <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse"></div>
         <div className="h-10 bg-slate-200 rounded-lg mt-4 animate-pulse"></div>
      </div>
   </div>
);

