export interface Project {
  title: string;
  source_code_url: string;
  live_url: string;
  MbEventId: string;
  UserId?: string;
  files: string[];
}

export interface ProjectSearchResult {
  ratingAverage: number;
  ratingCount: number;
  id: string;
  title: string;
  live_url: string;
  cover_image_url: string;
  user_fullname: string;
}

/*
      filter_userId: undefined,
      filter_mbEventId: undefined,
      filter_ratingCount_min: undefined,
      filter_ratingAverage_min: undefined,
      sort_direction: 'desc',
      sort_field: 'RATING_AVERAGE',
      limit: 25,
      offset: 0

*/
export interface ProjectSearchQuery {
  userId?: string;
  mbEventId?: string;
  ratingCountMin?: number;
  ratingAverageMin?: number;
  sortDirection?: 'asc' | 'desc';
  sortField?: 'CREATED_AT' | 'RATING_AVERAGE' | 'RATING_COUNT';
  limit?: number;
  offset?: number;
}