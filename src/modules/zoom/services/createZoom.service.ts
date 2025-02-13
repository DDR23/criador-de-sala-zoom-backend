import { Inject, Injectable } from "@nestjs/common";
import { ZOOM_SERVICE_TOKEN } from "../utils/zoomServiceToken";
import { IZoomRepositories } from "../domain/repositories/IZoomRepositories";
import { CreateZoomDto } from "../domain/dto/create-zoom.dto";
import { GenerateZoomAccessTokenService } from "./generateZoomAccessToken.service";

@Injectable()
export class CreateZoomService {
  private readonly ZOOM_API_URL = "https://api.zoom.us/v2/users/me/meetings";

  constructor(
    @Inject(ZOOM_SERVICE_TOKEN)
    private readonly zoomRepositories: IZoomRepositories,
    private readonly generateZoomAccessTokenService: GenerateZoomAccessTokenService
  ) {}

  async execute(data: CreateZoomDto): Promise<{ url: string }> {
    const zoomapi = this.ZOOM_API_URL;
    const accessToken = await this.generateZoomAccessTokenService.execute();

    const meeting = {
      topic: data.topic,
      type: data.type || 2,
      start_time: data.start_time,
      duration: data.duration,
      timezone: data.timezone || "America/Sao_Paulo",
      password: data.password || "",
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        approval_type: 0,
      },
    };

    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    return this.zoomRepositories.createZoom({
      zoomapi,
      meeting,
      headers,
    });
  }
}
