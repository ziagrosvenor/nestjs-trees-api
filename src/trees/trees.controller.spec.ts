import { Test, TestingModule } from '@nestjs/testing';
import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';
import { TreesQueryDto } from './dto';

jest.mock(
  './data/trees.json',
  () => [
    {
      id: 0,
      value: 37,
      createdAt: '2020-01-01T02:42:02.663Z',
      projectId: 723,
      varient: 'referral',
    },
    {
      id: 3,
      value: 8,
      createdAt: '2019-07-07T01:30:01.308Z',
      projectId: 891,
      varient: 'normal',
    },
  ],
  { virtual: true },
);

describe('TreesController', () => {
  let treesController: TreesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TreesController],
      providers: [TreesService],
    }).compile();

    treesController = app.get<TreesController>(TreesController);
  });

  describe('root', () => {
    it('should return a list of trees', async () => {
      const query = new TreesQueryDto();
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual({
        results: [
          {
            createdAt: '2020-01-01T02:42:02.663Z',
            id: 0,
            projectId: 723,
            value: 37,
            varient: 'referral',
          },
          {
            id: 3,
            value: 8,
            createdAt: '2019-07-07T01:30:01.308Z',
            projectId: 891,
            varient: 'normal',
          },
        ],
        totalTrees: 45,
      });
    });

    it('should return a list of trees with varient="normal"', async () => {
      const query = new TreesQueryDto();
      query.varient = 'normal';
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual({
        results: [
          {
            id: 3,
            value: 8,
            createdAt: '2019-07-07T01:30:01.308Z',
            projectId: 891,
            varient: 'normal',
          },
        ],
        totalTrees: 8,
      });
    });

    it('should return a list of trees within dateRange', async () => {
      const query = new TreesQueryDto();
      query.startDate = '2019-07-06T01:30:01.308Z';
      query.endDate = '2019-07-08T01:30:01.308Z';
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual({
        results: [
          {
            id: 3,
            value: 8,
            createdAt: '2019-07-07T01:30:01.308Z',
            projectId: 891,
            varient: 'normal',
          },
        ],
        totalTrees: 8,
      });
    });

    it('should return a list of trees same or after startDate', async () => {
      const query = new TreesQueryDto();
      query.startDate = '2020-01-01T02:42:02.663Z';
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual({
        results: [
          {
            id: 0,
            value: 37,
            createdAt: '2020-01-01T02:42:02.663Z',
            projectId: 723,
            varient: 'referral',
          },
        ],
        totalTrees: 37,
      });
    });

    it('should return a list of trees same or before endDate', async () => {
      const query = new TreesQueryDto();
      query.endDate = '2020-01-01T02:42:02.663Z';
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual({
        results: [
          {
            id: 0,
            value: 37,
            createdAt: '2020-01-01T02:42:02.663Z',
            projectId: 723,
            varient: 'referral',
          },
          {
            id: 3,
            value: 8,
            createdAt: '2019-07-07T01:30:01.308Z',
            projectId: 891,
            varient: 'normal',
          },
        ],
        totalTrees: 45,
      });
    });

    it.each([
      [
        'projectId',
        {
          '723': 37,
          '891': 8,
        },
      ],
      [
        'varient',
        {
          normal: 8,
          referral: 37,
        },
      ],
    ])(
      'should return additionally return treeTotals grouped by %s',
      async (groupedByKey, expected) => {
        const query = new TreesQueryDto();
        query.totalTreesGroupedBy = groupedByKey;
        const trees = await treesController.getTrees(query);
        return expect(trees).toEqual({
          results: [
            {
              id: 0,
              value: 37,
              createdAt: '2020-01-01T02:42:02.663Z',
              projectId: 723,
              varient: 'referral',
            },
            {
              id: 3,
              value: 8,
              createdAt: '2019-07-07T01:30:01.308Z',
              projectId: 891,
              varient: 'normal',
            },
          ],
          totalTreesGrouped: expected,
          totalTrees: 45,
        });
      },
    );
  });
});
