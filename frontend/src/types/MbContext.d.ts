import { ApiService } from "@/services/apiService";
import { AuthService } from "@/services/authService";
import { MbEventService } from "@/services/mbEventService";

export interface MbContext {
  apiService: ApiService,
  authService: AuthService,
  mbEventService: MbEventService
}
