import { MbEvent } from "@/types/MbEvent";
import { ApiService } from "./apiService";
import isUpcoming from "../helpers/isUpcoming";
import isPast from "../helpers/isPast";

export class MbEventService {
  constructor(private apiService: ApiService) {}
  getMbEvents(): Promise<MbEvent> {
    return this.apiService.get("/api/v1/mb-event").then(resp =>
      resp.data.sort((a: MbEvent, b: MbEvent) => {
        return (
          new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        );
      })
    );
  }

  getUpcomingMbEvents(): Promise<MbEvent> {
    return this.apiService.get("/api/v1/mb-event").then(events => {
      return events.data.filter((e: MbEvent) => isUpcoming(e.end_time));
    });
  }

  getPastMbEvents(): Promise<MbEvent> {
    return this.apiService.get("/api/v1/mb-event").then(events => {
      return events.data.filter((e: MbEvent) => isPast(e.end_time));
    });
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
