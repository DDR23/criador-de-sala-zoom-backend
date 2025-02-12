export interface IZoomRepositories {
  createZoom(meetingData: any): Promise<{ url: string }>;
}
