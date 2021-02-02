import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        return {
            cors: {
                origin: 'http://localhost:3000',
                credentials: true,
            },
            autoSchemaFile: 'schema.gql',
            installSubscriptionHandlers: true,
            context: ({req, res, connection}) =>
                connection ? {req: connection.context} : {req, res},
        };
    }
}
