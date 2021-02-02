import {Field, InputType, Int} from '@nestjs/graphql';
import {ReportTypes} from '../enums/report-types.enum';

@InputType()
export class CreateReportInput {
    @Field(() => Int)
    readonly referenceId: number;

    @Field(() => ReportTypes)
    readonly type: ReportTypes;
}
