import { ApiService } from "../services/apiService";
import { MbContext } from "../types/MbContext";
import { MbEventService } from "../services/mbEventService";
import { ProjectService } from "../services/projectService";
import { UserProfileService } from "../services/userProfileService";
import { AuthService } from "@/services/authService";

// create the store
const apiService = new ApiService();

export default (): MbContext => {
  return {
    apiService,
    authService: new AuthService(apiService),
    mbEventService: new MbEventService(apiService),
    projectService: new ProjectService(apiService),
    userProfileService: new UserProfileService(apiService)
  };
};
