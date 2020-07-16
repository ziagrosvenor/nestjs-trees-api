import { Controller, Get, Query } from '@nestjs/common';
import { TreesService } from './trees.service';
import { Trees } from './trees.interface';
import { TreesQueryDto } from './dto';

interface TreesResponse {
  results: Trees[];
  totalTrees: number;
}

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Get()
  async getTrees(@Query() query: TreesQueryDto): Promise<TreesResponse> {
    const trees: Trees[] = await this.treesService.findAll(query);

    return {
      results: trees,
      totalTrees: trees.reduce(
        (totalTrees, { value }) => totalTrees + value,
        0,
      ),
    };
  }
}
