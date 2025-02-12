import { Inject, Injectable } from "@nestjs/common";
import { ZOOM_SERVICE_TOKEN } from "../utils/zoomServiceToken";
import { IZoomRepositories } from "../domain/repositories/IZoomRepositories";
import { CreateZoomDto } from "../domain/dto/create-zoom.dto";

@Injectable()
export class CreateZoomService {
  private readonly ZOOM_API_URL = process.env.ZOOM_API_URL || "";
  private readonly ZOOM_ACCESS_TOKEN = process.env.ZOOM_ACCESS_TOKEN || "";

  constructor(
    @Inject(ZOOM_SERVICE_TOKEN)
    private readonly zoomRepositories: IZoomRepositories,
  ) { }

  async execute(data: CreateZoomDto): Promise<{ url: string }> {
    if (!this.ZOOM_ACCESS_TOKEN) {
      throw new Error("O token de acesso do Zoom não está configurado.");
    }

    const zoomapi = this.ZOOM_API_URL;
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
        Authorization: `Bearer ${this.ZOOM_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      }
    };

    return this.zoomRepositories.createZoom({ zoomapi, meeting, headers });
  }
}
