'use client';

import { useSearchController } from './search.controller';
import { SearchView } from './search.view';

const SearchPage = () => {
   const viewModel = useSearchController();
   return <SearchView viewModel={viewModel} />;
};

export default SearchPage;
