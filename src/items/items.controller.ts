import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateItemDTO } from './dto/create-item-dto';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  // @Get()
  // findAll(): string {
  //   return 'get All items';
  // }
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createItemDTO: CreateItemDTO): Promise<Item> {
    return this.itemsService.create(createItemDTO);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }
  @Put(':id')
  Put(@Param('id') id, @Body() updateItemDTO: CreateItemDTO): Promise<Item> {
    return this.itemsService.update(id, updateItemDTO);
  }
}
