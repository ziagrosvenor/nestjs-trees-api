import { IsEnum, IsOptional } from 'class-validator';

export class TreesQueryDto {
  @IsOptional()
  @IsEnum(['referral', 'dividend', 'normal'])
  varient: string;
}
