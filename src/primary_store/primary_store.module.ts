import { Module } from '@nestjs/common';
import { PrimaryStoreController } from './primary_store.controller';
import { PrimaryStoreService } from './primary_store.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PrimaryStoreController],
  providers: [PrimaryStoreService, PrismaService],
})
export class PrimaryStoreModule {}