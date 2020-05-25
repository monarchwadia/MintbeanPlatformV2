import { MbUser } from './MbUser';
import { MbEvent } from './MbEvent';

export interface MbState {
  user?: MbUser;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
  mbEvents: MbEvent[];
}
