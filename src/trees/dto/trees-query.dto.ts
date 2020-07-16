import { IsEnum, IsOptional, IsDateString } from 'class-validator';

export class TreesQueryDto {
  @IsOptional()
  @IsEnum(['referral', 'dividend', 'normal'])
  varient: string;
  @IsOptional()
  @IsDateString()
  startDate: string;
  @IsOptional()
  @IsDateString()
  endDate: string;
}
