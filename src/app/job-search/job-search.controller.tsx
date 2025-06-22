'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IJob, IJobSearchForm, IJobSearchViewModel } from './job-search.type';

const jobSearchSchema = z.object({
   keywords: z.string().min(1, 'As palavras-chave são obrigatórias.'),
});

export const useJobSearchController = (): IJobSearchViewModel => {
   const [isLoading, setIsLoading] = useState(false);
   const [isFetchingMore, setIsFetchingMore] = useState(false);
   const [jobs, setJobs] = useState<IJob[]>([]);
   const [totalResults, setTotalResults] = useState(0);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [currentKeywords, setCurrentKeywords] = useState('');

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IJobSearchForm>({
      resolver: zodResolver(jobSearchSchema),
      defaultValues: {
         keywords: '',
      },
   });

   const fetchLinkedInJobs = useCallback(async (searchData: IJobSearchForm, pageNum: number): Promise<{ jobs: IJob[], total: number, hasMore: boolean }> => {
      const response = await fetch('/api/job-search', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...searchData, page: pageNum }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || 'Failed to fetch jobs');
      }

      const data = await response.json();
      const newJobs = data.jobs || data;

      return {
         jobs: newJobs,
         total: data.total || (newJobs.length > 0 ? newJobs.length : 0),
         hasMore: newJobs.length > 0, // A API não retorna 'hasMore', então inferimos
      };
   }, []);

   const onSearch = async (data: IJobSearchForm) => {
      setIsLoading(true);
      setJobs([]);
      setPage(1);
      setCurrentKeywords(data.keywords);
      setHasMore(true);

      try {
         const results = await fetchLinkedInJobs(data, 1);
         setJobs(results.jobs);
         setTotalResults(results.total);
         setHasMore(results.hasMore);
      } catch (error) {
         console.error('Failed to fetch jobs:', error);
         setTotalResults(0);
         setHasMore(false);
      } finally {
         setIsLoading(false);
      }
   };

   const loadMore = useCallback(async () => {
      if (isFetchingMore || !hasMore) return;

      setIsFetchingMore(true);
      const nextPage = page + 1;

      try {
         const results = await fetchLinkedInJobs({ keywords: currentKeywords }, nextPage);
         setJobs(prevJobs => [...prevJobs, ...results.jobs]);
         setPage(nextPage);
         setHasMore(results.hasMore);
      } catch (error) {
         console.error('Failed to fetch more jobs:', error);
         setHasMore(false);
      } finally {
         setIsFetchingMore(false);
      }
   }, [page, isFetchingMore, hasMore, currentKeywords, fetchLinkedInJobs]);

   return {
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
   };
}; 