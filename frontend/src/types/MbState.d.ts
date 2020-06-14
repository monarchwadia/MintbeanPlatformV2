import { MbUser } from "./MbUser";
import { MbEvent } from "./MbEvent";
import { Project } from "./Project";

export interface MbState {
  user?: MbUser;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
  mbEvents: MbEvent[];
  project?: Project;
  // TODO; fix types;
  votes: any[];
}
