import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

export interface IJob {
   position: string;
   company: string;
   companyLogo: string;
   location: string;
   date: string;
   agoTime: string;
   salary: string;
   jobUrl: string;
   // O ID não vem da API, podemos usar o jobUrl como chave se for único
}

export interface ISearchForm {
   keywords: string;
}

export interface ISearchViewModel {
   control: Control<ISearchForm>;
   errors: FieldErrors<ISearchForm>;
   handleSubmit: UseFormHandleSubmit<ISearchForm>;
   onSearch: (data: ISearchForm) => void;
   isLoading: boolean;
   jobs: IJob[];
   totalResults: number;
   loadMore: () => void;
   hasMore: boolean;
   isFetchingMore: boolean;
}

export const popularSearches = [
   'Desenvolvedor React',
   'Product Designer',
   'Data Scientist',
   'DevOps Engineer',
   'Product Manager',
   'UX Designer',
];

export const locations = [
   { value: '', label: 'Todas as Localizações' },
   { value: 'sao-paulo', label: 'São Paulo, SP' },
   { value: 'rio-de-janeiro', label: 'Rio de Janeiro, RJ' },
   { value: 'belo-horizonte', label: 'Belo Horizonte, MG' },
   { value: 'remoto', label: 'Remoto' },
];
