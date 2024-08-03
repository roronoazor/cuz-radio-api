import { Module } from '@nestjs/common';
import { SecondaryStoreController } from './secondary_store.controller';
import { SecondaryStoreService } from './secondary_store.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SecondaryStoreController],
  providers: [SecondaryStoreService, PrismaService],
})
export class SecondaryStoreModule {}