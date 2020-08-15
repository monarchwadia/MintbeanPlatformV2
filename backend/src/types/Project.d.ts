import { MediaAsset } from "./MediaAsset";
import { User } from "./User";
import { Vote } from "./Vote";

export interface Project {
  id: string;
  title: string;
  source_code_url: string;
  live_url: string;
  MbEventId: string;
  UserId?: string;
  files: string[];
  createdAt: date;
  updatedAt: date;
}

export interface ProjectWithAssociations {
  id: string;
  title: string;
  source_code_url: string;
  live_url: string;
  MbEventId: string;
  UserId?: string;
  files: string[];
  createdAt: date;
  updatedAt: date;
  User: User;
  MediaAssets: MediaAsset[];
  Votes: Vote[];
}
