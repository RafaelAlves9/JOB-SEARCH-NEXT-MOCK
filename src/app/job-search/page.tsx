'use client';

import { useJobSearchController } from './job-search.controller';
import { JobSearchView } from './job-search.view';

const JobSearchPage = () => {
   const viewModel = useJobSearchController();
   return <JobSearchView viewModel={viewModel} />;
};

export default JobSearchPage; 