import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateItemDto } from '../admin_store/dto';
import { UserRole } from '../constants/user-roles';
import { Prisma, User, Item } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SecondaryStoreService {
  constructor(private prisma: PrismaService) {}
  
  async createItem(
    data: Omit<Prisma.ItemCreateInput, 'sku' | 'createdBy'>,
    user: Pick<User, 'id'>,
  ) {
    const sku = uuidv4();
    return this.prisma.item.create({
      data: {
        ...data,
        sku,
        createdBy: {
          connect: { id: user.id },
        },
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            role: true,
            email: true,
          },
        },
      },
    });
  }

  async getAllItems(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [items, totalCount] = await Promise.all([
      this.prisma.item.findMany({
        where: {
          createdBy: {
            role: {
              in: [UserRole.SECONDARY],
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          createdBy: {
            select: {
              id: true,
              username: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.item.count({
        where: {
          createdBy: {
            role: {
              in: [UserRole.SECONDARY],
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      items,
      pagination: {
        totalItems: totalCount,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async getItem(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { 
        createdBy: {
          select: {
            username: true,
            email: true,
            role: true
          }
        }
      },
    });

    if (!item) {
        throw new NotFoundException('Item not found');
    }

    if (!this.canViewSecondaryItem(item)){
        throw new NotFoundException('you cannot view this item');
    }

    return item;
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto, userId: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    if (!this.canModifySecondaryItem(item, userId)) {
      throw new ForbiddenException('You can only update this items');
    }

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async deleteItem(id: string, userId: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    if (!this.canModifySecondaryItem(item, userId)) {
      throw new ForbiddenException('You can not delete this item');
    }

    return this.prisma.item.delete({
      where: { id },
    });
  }

  private canViewSecondaryItem(item: (Item & { createdBy: { username:string, email:string, role:string } })) {
    return item.createdBy.role === UserRole.SECONDARY;
  }

  private canModifySecondaryItem(item: (Item & { createdBy: User }), userId:string) {
    return item.createdBy.id === userId && item.createdBy.role === UserRole.SECONDARY
  }
}