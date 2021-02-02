import {EntityRepository, Repository} from 'typeorm';
import {CreateSessionDto} from './dto/create-session.dto';
import {UpdateSessionDto} from './dto/update-session.dto';
import {Session} from './session.entity';

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
    createSession = async (data: CreateSessionDto): Promise<Session> => {
        const user = Promise.resolve(data.user);
        const model = new Session({user});
        return await this.save(model, {reload: true});
    };

    updateSession = async (
        id: number,
        data: UpdateSessionDto,
    ): Promise<Session> => {
        return await this.save({...data, id}, {reload: true});
    };
}
