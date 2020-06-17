export interface MbErrorRequest {
  title: string;
  description: string;
  error?: Error;
}

export interface MbError {
  id: string;
  title: string;
  description: string;
  timeout: number;
}
