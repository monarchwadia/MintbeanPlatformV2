import { MbUser } from '@/types/MbUser';
import { ApiService } from './apiService';

export class AuthService {
  constructor(private apiService: ApiService) {
  }
  checkAuth(): Promise<MbUser> {
    return this.apiService.get('/api/v1/auth/check')
      .then(resp => resp.data);
  }
}
