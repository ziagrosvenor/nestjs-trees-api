import { Injectable } from '@nestjs/common';
import { Trees } from './trees.interface';

@Injectable()
export class TreesService {
  async findAll(): Promise<Trees[]> {
    return [
      {
        id: 1,
        value: 70,
        createdAt: '2019-07-01T10:48:35.910Z',
        projectId: 113,
        varient: 'referral',
      },
    ];
  }
}
