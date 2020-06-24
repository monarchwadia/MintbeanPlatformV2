import { MbEvent } from "@/types/MbEvent";
import { ApiService } from "./apiService";

export class MbEventService {
  constructor(private apiService: ApiService) {}
  getMbEvents(): Promise<MbEvent> {
    return this.apiService.get("/api/v1/mb-event").then((resp) =>
      resp.data.sort((a: any, b: any) => {
        return (
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        );
      })
    );
  }

  async fetchMbEvent(mbEventId: string): Promise<MbEvent> {
    const queryResponse = await this.apiService.get(
      "/api/v1/mb-event/" + mbEventId
    );
    return queryResponse.data;
  }

  async create(mbEvent: MbEvent): Promise<MbEvent> {
    const queryResponse = await this.apiService.post(
      "/api/v1/mb-event/",
      mbEvent
    );
    return queryResponse.data;
  }
}
