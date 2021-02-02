import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {BadRequestException, ConflictException, NotFoundException, UseGuards} from '@nestjs/common';
import {GqlCurrentUser} from '@/core/decorators/gql-current-user.decorator';
import {CreateReportInput} from './inputs/create-report.input';
import {GqlAuthGuard} from '@/core/guards/gql-auth.guard';
import {ProfileService} from '../profile/profile.service';
import {User} from '@/core/auth/modules/user/user.entity';
import {ReportTypes} from './enums/report-types.enum';
import {PostService} from '../post/post.service';
import {ReportService} from './report.service';
import {Report} from './report.entity';
import {AuthorizedRoles} from '@/core/decorators/authorized-roles.decorator';
import {UserRoles} from '@/core/auth/modules/user/enums/user-roles.enum';
import {UpdateReportInput} from './inputs/update-report.input';
import {GqlRolesGuard} from '@/core/guards/gql-roles.guard';

@UseGuards(GqlAuthGuard)
@Resolver(() => Report)
export class ReportResolver {
    constructor(
        readonly postService: PostService,
        readonly reportService: ReportService,
        readonly profileService: ProfileService,
    ) {
    }

    @Mutation(() => Report)
    async createReport(
        @GqlCurrentUser() currentUser: User,
        @Args('input') input: CreateReportInput,
    ): Promise<Report> {
        const emitter = currentUser;
        const {type, referenceId} = input;
        if (!type) throw new BadRequestException('Type is required');
        if (!referenceId) throw new BadRequestException('Reference Id is required');

        const where = {emitter: {id: emitter.id}, type, referenceId};
        const report = await this.reportService.repository.findOne({where});
        if (report) throw new ConflictException('Report already exists');

        switch (type) {
        case ReportTypes.POST: {
            const post = await this.postService.repository.findOne(referenceId);
            if (!post) throw new NotFoundException('Post not found');
            return await this.reportService.repository.createReport({
                referenceId,
                emitter,
                type,
            });
        }

        case ReportTypes.PROFILE: {
            const profile = await this.profileService.repository.findOne(
                referenceId,
            );
            if (!profile) throw new NotFoundException('Profile not found');
            return await this.reportService.repository.createReport({
                referenceId,
                emitter,
                type,
            });
        }

        default:
            throw new BadRequestException('Unknown Type');
        }
    }

    @UseGuards(GqlRolesGuard)
    @AuthorizedRoles(UserRoles.ADMIN)
    @Mutation(() => Report)
    async updateReport(
        @Args('id') id: number,
        @Args('input') input: UpdateReportInput,
    ): Promise<Report> {
        if (!input.status) throw new BadRequestException('Status is required');
        return await this.reportService.repository.updateReport(id, input);
    }
}
