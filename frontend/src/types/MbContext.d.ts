import { ApiService } from "@/services/apiService";
import { AuthService } from "@/services/authService";
import { MbEventService } from "@/services/mbEventService";
import { ProjectService } from "@/services/projectService";
import { UserProfileService } from "@/services/userProfileService";
import { MbConfigService } from "@/services/mbConfigService";

export interface MbContext {
  apiService: ApiService;
  authService: AuthService;
  mbEventService: MbEventService;
  projectService: ProjectService;
  userProfileService: UserProfileService;
  mbConfigService: MbConfigService;
}
