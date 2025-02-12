import { IsString, IsOptional, IsInt, IsDateString } from "class-validator";

export class CreateZoomDto {
  @IsString()
  topic: string;

  @IsOptional()
  @IsInt()
  type?: number;

  @IsOptional()
  @IsDateString()
  start_time?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsString()
  timezone?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
