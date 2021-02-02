import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BlockRepository} from './block.repository';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(BlockRepository)
    readonly repository: BlockRepository,
  ) {}
}
