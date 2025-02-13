import { Inject, Injectable } from "@nestjs/common";
import { ZOOM_SERVICE_TOKEN } from "../utils/zoomServiceToken";
import { IZoomRepositories } from "../domain/repositories/IZoomRepositories";

@Injectable()
export class GenerateZoomAccessTokenService {
  private readonly ZOOM_AUTH_URL = "https://zoom.us/oauth/token";
  private readonly CLIENT_ID = process.env.ZOOM_CLIENT_ID || "";
  private readonly CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET || "";
  private readonly ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID || "";
  private accessToken: string | null = null;
  private tokenExpiration: number | null = null;

  constructor(
    @Inject(ZOOM_SERVICE_TOKEN)
    private readonly zoomRepositories: IZoomRepositories,
  ) { }

  async execute(): Promise<string | null> {
    const currentTime = Math.floor(Date.now() / 1000);

    if (this.accessToken && this.tokenExpiration && this.tokenExpiration > currentTime) {
      return this.accessToken;
    }

    const response = await this.zoomRepositories.getZoomAccessToken({
      zoomAuthUrl: this.ZOOM_AUTH_URL,
      accountId: this.ACCOUNT_ID,
      clientId: this.CLIENT_ID,
      clientSecret: this.CLIENT_SECRET,
    });

    this.accessToken = response.access_token;
    this.tokenExpiration = currentTime + response.expires_in;

    return this.accessToken;
  }
}
