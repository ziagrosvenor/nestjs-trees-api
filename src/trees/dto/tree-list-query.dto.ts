import { IsEnum, IsOptional, IsDateString } from 'class-validator';

export class TreeListQueryDto {
  @IsOptional()
  @IsEnum(['referral', 'dividend', 'normal'])
  varient: string;
  @IsOptional()
  @IsDateString()
  startDate: string;
  @IsOptional()
  @IsDateString()
  endDate: string;
  @IsOptional()
  @IsEnum(['projectId', 'varient'])
  totalTreesGroupedBy: string;
}
