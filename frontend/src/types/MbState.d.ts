import { MbUser } from "./MbUser";
import { MbEvent } from "./MbEvent";
import { Project } from "./Project";
import { MbError } from "./MbError";
import { MbVote } from "./MbVote";

export interface MbState {
  user?: MbUser;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
  mbEvents: MbEvent[];
  project?: Project;
  // TODO; fix types;
  votes: MbVote[];
  mbErrors: MbError[];
}
