import { CreateZoomDto } from "../dto/create-zoom.dto";

export interface IZoomRepositories {
  createZoom(data: {
    zoomapi: string;
    meeting: CreateZoomDto;
    headers: { headers: { Authorization: string; "Content-Type": string } };
  }): Promise<{ url: string }>;

  getZoomAccessToken(data: {
    zoomAuthUrl: string;
    accountId: string;
    clientId: string;
    clientSecret: string;
  }): Promise<{ access_token: string; expires_in: number }>;
}
