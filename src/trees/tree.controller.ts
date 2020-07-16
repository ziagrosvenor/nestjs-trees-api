import { Controller, Get, Query } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Tree } from './tree.interface';
import { TreeListQueryDto } from './dto';
import { groupBy, transform } from 'lodash';

interface TreesResponse {
  results: Tree[];
  totalTreesGrouped?: Record<string, number>;
  totalTrees: number;
}

/**
 *
 * @param trees A list of tree entities used to calculate a total amount planted.
 */
function getTotalTrees(trees: Tree[]): number {
  return trees.reduce((totalTrees, { value }) => totalTrees + value, 0);
}

/**
 * Used to group a list of tree entities by a key i.e `projectId` or `varient`
 * and then calculate the total amount of trees in each group.
 *
 * @param key The key in the tree data to group the trees by
 * @param trees A list of all the trees to group
 */
function getTotalTreesGroupedByKey(key: string, trees: Tree[]): any {
  return transform(
    groupBy(trees, (tree: Tree) => tree[key]),
    (r: any, v: Tree[], k: string) => {
      r[k] = getTotalTrees(v);
    },
  );
}

@Controller('trees')
export class TreeController {
  constructor(private readonly treesService: TreeService) {}

  @Get()
  async getTrees(@Query() query: TreeListQueryDto): Promise<TreesResponse> {
    const trees: Tree[] = await this.treesService.findAll(query);

    let totalTreesGrouped: Record<string, number>;

    if (query.totalTreesGroupedBy) {
      totalTreesGrouped = getTotalTreesGroupedByKey(
        query.totalTreesGroupedBy,
        trees,
      );
    }

    return {
      results: trees,
      totalTreesGrouped,
      totalTrees: getTotalTrees(trees),
    };
  }
}
