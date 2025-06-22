import { Control, FieldErrors, UseFormHandleSubmit, UseFormGetValues } from 'react-hook-form';

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

export interface IJobSearchForm {
  keywords: string;
}

export interface IJobSearchViewModel {
  control: Control<IJobSearchForm>;
  errors: FieldErrors<IJobSearchForm>;
  handleSubmit: UseFormHandleSubmit<IJobSearchForm>;
  onSearch: (data: IJobSearchForm) => void;
  isLoading: boolean;
  jobs: IJob[];
  totalResults: number;
  loadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
}

export const popularJobSearches = [
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
