import { ApiService } from "./apiService";
import { MbConfig } from "@/types/MbConfig";

export class MbConfigService {
  constructor(private apiService: ApiService) {}

  async getValueByKey(key: string): Promise<MbConfig> {
    return this.apiService
      .get("/api/v1/mb-config/" + key)
      .then(resp => resp.data);
  }

  async patchValueByEndpoint(key: string, newValue: string): Promise<MbConfig> {
    return this.apiService
      .patch("/api/v1/mb-config/" + key, { configValue: newValue })
      .then(resp => resp.data);
  }

  async getAscFeaturedSections(): Promise<MbConfig> {
    return this.apiService
      .get("/api/v1/mb-config/asc/featured-sections")
      .then(resp => resp.data);
  }
}
