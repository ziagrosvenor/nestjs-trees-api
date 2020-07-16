import { Test, TestingModule } from '@nestjs/testing';
import { TreesController } from './trees.controller';
import { TreesService } from './trees.service';

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
      const trees = await treesController.getTrees();
      return expect(trees).toEqual([
        {
          createdAt: '2020-01-01T02:42:02.663Z',
          id: 0,
          projectId: 723,
          value: 37,
          varient: 'referral',
        },
      ]);
    });
  });
});
