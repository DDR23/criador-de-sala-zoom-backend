export interface IZoomRepositories {
  createZoom(meetingData: {
    zoomapi: string;
    meeting: any;
    headers: any;
  }): Promise<{ url: string }>;
  
  getZoomAccessToken(data: {
    zoomAuthUrl: string;
    accountId: string;
    clientId: string;
    clientSecret: string;
  }): Promise<any>;
}
