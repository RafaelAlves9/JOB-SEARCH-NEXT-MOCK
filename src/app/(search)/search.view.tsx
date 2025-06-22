'use client';

import { ISearchViewModel } from './search.type';
import { SearchHeader } from '../../components/searchHeader/SearchHeader';
import { JobList } from '../../components/jobList/JobList';

export const SearchView = ({ viewModel }: { viewModel: ISearchViewModel }) => {
   const { control, errors, handleSubmit, onSearch, isLoading, jobs, totalResults, loadMore, hasMore, isFetchingMore } =
      viewModel;

   return (
      <div className="min-h-screen bg-slate-50 text-slate-800">
         <SearchHeader
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSearch={onSearch}
            isLoading={isLoading}
         />

         <main className="container mx-auto px-4 py-10">
            <JobList
               jobs={jobs}
               isLoading={isLoading}
               isFetchingMore={isFetchingMore}
               hasMore={hasMore}
               totalResults={totalResults}
               loadMore={loadMore}
            />
         </main>
      </div>
   );
};
