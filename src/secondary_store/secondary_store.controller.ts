import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Req,
    Query,
    ValidationPipe,
    UsePipes
  } from '@nestjs/common';
  import { Request } from 'express';
  import { SecondaryStoreService } from './secondary_store.service';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UpdateItemDto, CreateItemDto } from '../admin_store/dto';
  import { UserRole } from 'src/constants/user-roles';
  
  @Controller('secondary_store')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SECONDARY, UserRole.ADMIN)
  export class SecondaryStoreController {
    constructor(private readonly secondaryStoreService: SecondaryStoreService) {}
  
    @Post('items')
    async createItem(@Body() createItemDto: CreateItemDto, @Req() req: Request) {
      const user = req.user as { id: string };
      const data = await this.secondaryStoreService.createItem(createItemDto, {
        id: user.id,
      });
      return { message: 'success', data };
    }
  
    @Get('items')
    async getAllItems(
      @Query('page') page: string,
      @Query('limit') limit: string,
    ) {
      const pageNumber = page ? parseInt(page, 10) : 1;
      const limitNumber = limit ? parseInt(limit, 10) : 10;
  
      const { items, pagination } = await this.secondaryStoreService.getAllItems(
        pageNumber,
        limitNumber,
      );
      return {
        message: 'success',
        data: items,
        pagination,
      };
    }
  
    @Get('items/:id')
    async getItem(@Param('id') id: string) {
      const data = await this.secondaryStoreService.getItem(id);
      return { message: 'success', data };
    }
  
    @Put('items/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async updateItem(
      @Param('id') id: string,
      @Body() updateItemDto: UpdateItemDto,
      @Req() req: Request
    ) {
      const user = req.user as { id: string };
      const data = await this.secondaryStoreService.updateItem(id, updateItemDto, user.id);
      return { message: 'success', data };
    }
  
    @Delete('items/:id')
    async deleteItem(@Param('id') id: string, @Req() req: Request) {
      const user = req.user as { id: string };
      const data = await this.secondaryStoreService.deleteItem(id, user.id);
      return { message: 'success', data };
    }
  }