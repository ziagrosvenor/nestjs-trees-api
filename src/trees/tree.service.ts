import { Injectable } from '@nestjs/common';
import { Tree } from './tree.interface';
import * as trees from './data/trees.json';
import { TreeListQueryDto } from './dto';
import * as moment from 'moment';

@Injectable()
export class TreeService {
  trees: Tree[] = trees;

  async findAll(query: TreeListQueryDto): Promise<Tree[]> {
    return this.trees
      .filter(tree => {
        if (query.varient) {
          return tree.varient === query.varient;
        }

        return tree;
      })
      .filter(tree => {
        if (query.startDate && query.endDate) {
          return moment(tree.createdAt).isBetween(
            query.startDate,
            query.endDate,
          );
        }

        if (query.startDate) {
          return moment(tree.createdAt).isSameOrAfter(query.startDate);
        }

        if (query.endDate) {
          return moment(tree.createdAt).isSameOrBefore(query.endDate);
        }

        return tree;
      });
  }
}
