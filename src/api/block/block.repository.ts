import {CreateBlockDto} from './dto/create-block.dto';
import {Repository, EntityRepository} from 'typeorm';
import { Block } from './block.entity';

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {

    createBlock = async (data: CreateBlockDto): Promise<Block> => {
        const emitter = Promise.resolve(data.emitter);
        const receiver = Promise.resolve(data.receiver);
        const model = new Block({emitter, receiver});
        return await this.save(model, {reload: true});
    }
}
