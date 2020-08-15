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
