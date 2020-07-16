import { Controller, Get, Query } from '@nestjs/common';
import { TreesService } from './trees.service';
import { Trees } from './trees.interface';
import { TreesQueryDto } from './dto';
import { groupBy, transform } from 'lodash';

interface TreesResponse {
  results: Trees[];
  totalTreesGrouped?: Record<string, number>;
  totalTrees: number;
}

/**
 *
 * @param trees A list of tree entities used to calculate a total amount planted.
 */
function getTotalTrees(trees: Trees[]): number {
  return trees.reduce((totalTrees, { value }) => totalTrees + value, 0);
}

/**
 * Used to group a list of tree entities by a key i.e `projectId` or `varient`
 * and then calculate the total amount of trees in each group.
 *
 * @param key The key in the tree data to group the trees by
 * @param trees A list of all the trees to group
 */
function getTotalTreesGroupedByKey(key: string, trees: Trees[]): any {
  return transform(
    groupBy(trees, (tree: Trees) => tree[key]),
    (r: any, v: Trees[], k: string) => {
      r[k] = getTotalTrees(v);
    },
  );
}

@Controller('trees')
export class TreesController {
  constructor(private readonly treesService: TreesService) {}

  @Get()
  async getTrees(@Query() query: TreesQueryDto): Promise<TreesResponse> {
    const trees: Trees[] = await this.treesService.findAll(query);

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
