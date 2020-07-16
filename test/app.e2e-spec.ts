import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as request from 'supertest';
import { AppModule } from './../src/app.module';

jest.mock(
  '../src/trees/data/trees.json',
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

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/trees (GET) - Successfully returns list of trees', () => {
    return request(app.getHttpServer())
      .get('/trees')
      .expect(200)
      .expect(
        '{"results":[{"id":0,"value":37,"createdAt":"2020-01-01T02:42:02.663Z","projectId":723,"varient":"referral"},{"id":3,"value":8,"createdAt":"2019-07-07T01:30:01.308Z","projectId":891,"varient":"normal"}],"totalTrees":45}',
      );
  });

  it('/trees?varient=normal (GET) - Successfully returns list of normal trees', () => {
    return request(app.getHttpServer())
      .get('/trees?varient=normal')
      .expect(200)
      .expect(
        '{"results":[{"id":3,"value":8,"createdAt":"2019-07-07T01:30:01.308Z","projectId":891,"varient":"normal"}],"totalTrees":8}',
      );
  });

  it('/trees?varient=foo (GET) - Returns a 400 error when varient is invalid', () => {
    return request(app.getHttpServer())
      .get('/trees?varient=foo')
      .expect(400);
  });
});
