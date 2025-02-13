import { Injectable } from "@nestjs/common";
import { IZoomRepositories } from "../domain/repositories/IZoomRepositories";
import axios from "axios";

@Injectable()
export class ZoomRepository implements IZoomRepositories {
  async createZoom(meetingData: { zoomapi: string; meeting: any; headers: any }): Promise<{ url: string }> {
    const { zoomapi, meeting, headers } = meetingData;
    const response = await axios.post(zoomapi, meeting, headers);
    return { url: response.data.join_url };
  }

  async getZoomAccessToken(data: { zoomAuthUrl: string; accountId: string; clientId: string; clientSecret: string }): Promise<any> {
    const { zoomAuthUrl, accountId, clientId, clientSecret } = data;

    const response = await axios.post(zoomAuthUrl, null, {
      params: {
        grant_type: "account_credentials",
        account_id: accountId,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  }
}
