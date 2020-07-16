import { Controller, Get } from '@nestjs/common';
import { TreesService } from './trees.service';
import { Trees } from './trees.interface';

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Get()
  getTrees(): Promise<Trees[]> {
    return this.treesService.findAll();
  }
}
