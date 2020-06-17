import { MbUser } from "./MbUser";
import { MbEvent } from "./MbEvent";
import { Project } from "./Project";
import { MbError } from "./MbError";

export interface MbState {
  user?: MbUser;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
  mbEvents: MbEvent[];
  project?: Project;
  // TODO; fix types;
  votes: any[];
  mbErrors: MbError[];
}
