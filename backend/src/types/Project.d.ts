import { MediaAsset } from "./MediaAsset";
import { User } from "./User";
import { Vote } from "./Vote";

export interface ProjectParams {
  title: string;
  source_code_url: string;
  live_url: string;
  MediaAssets: Array<MediaAssetType>;
  MbEventId: string;
  UserId: string;
}

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

export interface ProjectExpl {
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
