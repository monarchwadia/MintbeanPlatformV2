import { ApiService } from './apiService';
import { Project } from '@/types/Project';

export class ProjectService {
  constructor(private apiService: ApiService) {
  }
  async submitProject(obj: Project): Promise<Project> {
    const queryResponse = await this.apiService.post('/api/v1/project', obj);
    return queryResponse.data;
  }
}
