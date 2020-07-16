import { Injectable } from '@nestjs/common';
import { Trees } from './trees.interface';
import * as trees from './data/trees.json';
import { TreesQueryDto } from './dto';

@Injectable()
export class TreesService {
  trees: Trees[] = trees;

  async findAll(query: TreesQueryDto): Promise<Trees[]> {
    return this.trees.filter(tree => {
      if (query.varient) {
        return tree.varient === query.varient;
      }

      return tree;
    });
  }
}
