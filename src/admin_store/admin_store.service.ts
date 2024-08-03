import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateItemDto } from './dto';
import { Prisma, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminStoreService {
  constructor(
    private prisma: PrismaService
  ) {}

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
      this.prisma.item.count(),
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

    // admins can view anything

    return item;
  }

  async updateItem(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // admins can update anything

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async deleteItem(id: string) {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { createdBy: true },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // admin can delete anything

    return this.prisma.item.delete({
      where: { id },
    });

  }

  
}
