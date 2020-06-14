import { ApiService } from "./apiService";
import { MbUser } from "@/types/MbUser";

export class UserProfileService {
  constructor(private apiService: ApiService) {}

  async fetchUserProfile(userId: string): Promise<MbUser> {
    const queryResponse = await this.apiService.get(
      "/api/v1/user-profile/" + userId
    );
    return queryResponse.data;
  }
}
