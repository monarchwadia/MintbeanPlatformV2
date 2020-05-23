import { ApiService } from "@/services/apiService";
import { AuthService } from "@/services/authService";

export interface MbContext {
  apiService: ApiService,
  authService: AuthService
}
