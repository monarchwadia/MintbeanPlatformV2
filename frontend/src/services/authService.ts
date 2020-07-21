import { MbUser } from "@/types/MbUser";
import { ApiService } from "./apiService";

export class AuthService {
  constructor(private apiService: ApiService) {}
  checkAuth(): Promise<MbUser> {
    return this.apiService.get("/api/v1/auth/self").then(resp => resp.data);
  }
  login(email: string, password: string): Promise<MbUser> {
    return this.apiService
      .post("/api/v1/auth/login", { email, password })
      .then(resp => resp.data);
  }
  reset(email: string): Promise<MbUser> {
    return this.apiService
      .post("/api/v1/auth/reset", { email })
      .then(resp => resp.data);
  }
  checkPasswordResetToken(token: string): Promise<MbUser> {
    return this.apiService
      .post("/api/v1/auth/check-token", { token })
      .then(resp => resp.data);
  }
  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<MbUser> {
    return this.apiService
      .post("/api/v1/auth/register", { firstname, lastname, email, password })
      .then(resp => resp.data);
  }
  logout(): Promise<any> {
    return this.apiService.post("/api/v1/auth/logout", null);
  }
}
