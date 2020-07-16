import { Injectable } from '@nestjs/common';
import { Trees } from './trees.interface';
import * as trees from './data/trees.json';

@Injectable()
export class TreesService {
  trees: Trees[] = trees;

  async findAll(): Promise<Trees[]> {
    return this.trees;
  }
}
