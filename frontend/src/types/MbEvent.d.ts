export interface MbEvent {
  title: string;
  description: string;
  cover_image_url: string;
  instructions: string;
  start_time: Date;
  end_time: Date;
  register_link: string;
  region: string;
  createdAt?: Date;
  updatedAt?: Date;
}
