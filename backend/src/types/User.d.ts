export interface UserPublic {
  isAdmin: boolean | undefined;
  firstname: string;
  lastname: string;
  email: string;
  linkedin_id: string | undefined;
  github_id: string | undefined;
  twitter_id: string | undefined;
  stackoverflow_id: string | undefined;
}

export interface User {
  isAdmin: boolean | undefined;
  firstname: string;
  lastname: string;
  email: string;
  linkedin_id: string | undefined;
  github_id: string | undefined;
  twitter_id: string | undefined;
  stackoverflow_id: string | undefined;
  confirmed: boolean;
  password_hash: string;
  reset_token: string | undefined;
  reset_token_created_at: date;
}
