import { ApiService } from './apiService';
import { Project } from '@/types/Project';

export class ProjectService {
  constructor(private apiService: ApiService) {
  }
  async submitProject(obj: Project): Promise<Project> {
    const queryResponse = await this.apiService.post('/api/v1/project', obj);
    return queryResponse.data;
  }

  // TODO; install types
  async vote(obj: any): Promise<any> {
    const { ProjectId, rating, comment } = obj;

    const queryResponse = await this.apiService.post('/api/v1/vote', { ProjectId, rating, comment });
    return queryResponse.data;
  }
}