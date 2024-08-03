import { Module } from '@nestjs/common';
import { AdminStoreController } from './admin_store.controller';
import { AdminStoreService } from './admin_store.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AdminStoreController],
  providers: [AdminStoreService, PrismaService],
})
export class AdminStoreModule {}
