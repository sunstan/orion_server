import {Module} from '@nestjs/common';
import {DatabaseModule} from './database/database.module';
import {GraphqlModule} from './graphql/graphql.module';
import {PubsubModule} from './pubsub/pubsub.module';
import {AuthModule} from '@/core/auth/auth.module';

@Module({
  imports: [AuthModule, PubsubModule, GraphqlModule, DatabaseModule],
})
export class CoreModule {}
