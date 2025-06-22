import { TExempleServiceRequest } from "../dto/request/exempleService.request";

export interface IExempleServiceService {
   create(data: TExempleServiceRequest): Promise<boolean>;
}
