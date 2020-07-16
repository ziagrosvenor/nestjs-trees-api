import { Controller, Get, Query } from '@nestjs/common';
import { TreesService } from './trees.service';
import { Trees } from './trees.interface';
import { TreesQueryDto } from './dto';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Get()
  async getTrees(@Query() query: TreesQueryDto): Promise<Trees[]> {
    return this.treesService.findAll(query);
  }
}
