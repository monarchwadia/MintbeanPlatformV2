import { ApiService } from "./apiService";
import { Project, ProjectSearchResult } from "@/types/Project";

// filter_userId: Joi.string().uuid().min(1).optional(),
// filter_mbEventId: Joi.string().uuid().min(1).optional(),
// filter_ratingAverage_min: Joi.number().min(0).max(10).optional(),
// filter_ratingCount_min: Joi.number().min(0).max(10).optional(),
// sort_direction: Joi.string().valid(...Object.keys(VALID_SORT_DIRECTIONS)).optional().default('desc'),
// sort_field: Joi.string().valid(...Object.keys(VALID_SORT_FIELDS)).optional().default('RATING_AVERAGE'),
// limit: Joi.number().max(100).optional().default(25),
// offset: Joi.number().min(0).optional().default(0)

interface ProjectSearchOptions {
  userId: string;
  mbEventId: string;
  ratingAverageMin: number;
  ratingCountMin: number;
  sortDirection: "asc" | "desc";
  sortField: "CREATED_AT" | "RATING_AVERAGE" | "RATING_COUNT";
  limit: number;
  offset: number;
}

const mapProjectSearchOptions = (pso: ProjectSearchOptions) => {
  return {
    filter_userId: pso.userId,
    filter_mbEventId: pso.mbEventId,
    filter_ratingAverage_min: pso.ratingAverageMin,
    filter_ratingCount_min: pso.ratingCountMin,
    sort_direction: pso.sortDirection,
    sort_field: pso.sortField,
    limit: pso.limit,
    offset: pso.offset
  };
};

export class ProjectService {
  constructor(private apiService: ApiService) {}

  async submitProject(obj: Project): Promise<Project> {
    const queryResponse = await this.apiService.post("/api/v1/project", obj);
    return queryResponse.data;
  }

  async fetchProject(projectId: string): Promise<Project> {
    const queryResponse = await this.apiService.get(
      "/api/v1/project/" + projectId
    );
    return queryResponse.data;
  }

  async search(options: ProjectSearchOptions): Promise<ProjectSearchResult[]> {
    // apply against defaults
    const opts: ProjectSearchOptions = Object.assign(
      {
        userId: undefined,
        mbEventId: undefined,
        ratingAverageMin: undefined,
        ratingCountMin: 3,
        sortDirection: "desc",
        sortField: "RATING_AVERAGE",
        limit: 25,
        offset: 0
      },
      options
    );

    const params = mapProjectSearchOptions(opts);

    const queryResponse = await this.apiService.get("/api/v1/project/search", {
      params
    });

    return queryResponse.data;
  }

  // TODO; install types
  async vote(obj: any): Promise<any> {
    const { ProjectId, rating, comment } = obj;

    const queryResponse = await this.apiService.post("/api/v1/vote", {
      ProjectId,
      rating,
      comment
    });
    return queryResponse.data;
  }

  async deleteMediaAsset(obj: {
    ProjectId: string;
    MediaAssetId: string;
  }): Promise<void> {
    const queryResponse = await this.apiService.post(
      "/api/v1/project/deleteMediaAsset",
      obj
    );
    return queryResponse.data;
  }

  async uploadMediaAssets(obj: {
    ProjectId: string;
    MediaAssets: any[];
  }): Promise<void> {
    const queryResponse = await this.apiService.post(
      "/api/v1/project/uploadMediaAssets",
      obj
    );
    return queryResponse.data;
  }
}
