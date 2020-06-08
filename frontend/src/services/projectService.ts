import { ApiService } from './apiService';
import { Project } from '@/types/Project';

export class ProjectService {
  constructor(private apiService: ApiService) {
  }

  async submitProject(obj: Project): Promise<Project> {
    const queryResponse = await this.apiService.post('/api/v1/project', obj);
    return queryResponse.data;
  }

  async fetchProject(projectId: string): Promise<Project> {
    const queryResponse = await this.apiService.get('/api/v1/project/' + projectId);
    return queryResponse.data;
  }

  async fetchFrontpageProjects(): Promise<Project[]> {
    const queryResponse = await this.apiService.get('/api/v1/project/search?limit=10');
    return queryResponse.data;
  }

  // TODO; install types
  async vote(obj: any): Promise<any> {
    const { ProjectId, rating, comment } = obj;

    const queryResponse = await this.apiService.post('/api/v1/vote', { ProjectId, rating, comment });
    return queryResponse.data;
  }

  async deleteMediaAsset(obj: { ProjectId: string, MediaAssetId: string }): Promise<void> {
    const queryResponse = await this.apiService.post('/api/v1/project/deleteMediaAsset', obj);
    return queryResponse.data;
  }

  async uploadMediaAssets(obj: { ProjectId: string, MediaAssets: any[] }): Promise<void> {
    const queryResponse = await this.apiService.post('/api/v1/project/uploadMediaAssets', obj);
    return queryResponse.data;
  }
}
