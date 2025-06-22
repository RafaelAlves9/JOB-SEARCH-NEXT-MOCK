import { FetchBuilder } from './fetch.builder';
import { fetchWithInterceptor } from './fetch.intercept';

export interface IFetchInstances {
   public: (url: string, init?: RequestInit) => Promise<Response>;
}

export const fetchInstances = {
   public: FetchBuilder.build().withHeaders({ 'Content-Type': 'application/json' }).initInstance(),
};

export const fetchClient: IFetchInstances = {
   public: (url: string, init?: RequestInit) => fetchWithInterceptor(fetchInstances.public, url, init),
};
