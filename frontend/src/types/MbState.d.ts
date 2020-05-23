import { MbUser } from './MbUser';

export interface MbState {
  user?: MbUser;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
}
