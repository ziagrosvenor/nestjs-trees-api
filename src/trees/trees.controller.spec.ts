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
      return expect(trees).toEqual([
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
      ]);
    });

    it('should return a list of trees with varient="normal"', async () => {
      const query = new TreesQueryDto();
      query.varient = 'normal';
      const trees = await treesController.getTrees(query);
      return expect(trees).toEqual([
        {
          id: 3,
          value: 8,
          createdAt: '2019-07-07T01:30:01.308Z',
          projectId: 891,
          varient: 'normal',
        },
      ]);
    });
  });
});
