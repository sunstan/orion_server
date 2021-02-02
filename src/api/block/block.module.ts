import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockRepository } from './block.repository';
import { BlockResolver } from './block.resolver';
import { BlockService } from './block.service';
import { AuthModule } from '@/core/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([BlockRepository]),
  ],
  providers: [BlockResolver, BlockService],
  exports: [BlockService],
})
export class BlockModule {}
