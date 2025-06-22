'use client';

import React, { useRef, useCallback } from 'react';
import { IJob } from '../../app/(search)/search.type';
import { JobCard, SkeletonCard } from '../jobCard/JobCard';
import { NoResults } from '../noResult/NoResults';

interface IJobListProps {
   jobs: IJob[];
   isLoading: boolean;
   isFetchingMore: boolean;
   hasMore: boolean;
   totalResults: number;
   loadMore: () => void;
}

export const JobList = ({ jobs, isLoading, isFetchingMore, hasMore, totalResults, loadMore }: IJobListProps) => {
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
      [isLoading, hasMore, isFetchingMore, loadMore],
   );

   if (isLoading) {
      return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
               <SkeletonCard key={i} />
            ))}
         </div>
      );
   }

   if (jobs.length === 0) {
      return <NoResults />;
   }

   return (
      <>
         <h2 className="text-2xl font-bold mb-6">
            {totalResults > 0 ? `${totalResults} vagas encontradas` : 'Resultados da busca'}
         </h2>
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
               {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={`loading-${i}`} />
               ))}
            </div>
         )}
      </>
   );
}; 