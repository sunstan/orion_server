import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Profile } from './profile.entity';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  createProfile = async (data: CreateProfileDto): Promise<Profile> => {
    const model = new Profile(data);
    return await this.save(model, { reload: true });
  };

  updateProfile = async (
    id: number,
    data: UpdateProfileDto,
  ): Promise<Profile> => {
    return await this.save({ ...data, id }, { reload: true });
  };
}
