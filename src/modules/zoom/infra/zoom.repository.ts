import { Injectable } from "@nestjs/common";
import { IZoomRepositories } from "../domain/repositories/IZoomRepositories";
import axios from "axios";

@Injectable()
export class ZoomRepository implements IZoomRepositories {
  async createZoom(meetingData: { zoomapi: string, meeting: any, headers: any }): Promise<{ url: string }> {
    const { zoomapi, meeting, headers } = meetingData;

    const response = await axios.post(zoomapi, meeting, headers);

    return { url: response.data.join_url };
  }
}
