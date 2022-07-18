import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  //   private readonly items: Item[] = [
  //     {
  //       id: '1241',
  //       name: 'some product',
  //       desc: 'Some Description',
  //       qty: 5,
  //     },
  //     {
  //       id: '1412314',
  //       name: 'some product 2',
  //       desc: 'Some Description 2',
  //       qty: 1,
  //     },
  //     {
  //       id: '1241231',
  //       name: 'some product 3',
  //       desc: 'Some Description 3',
  //       qty: 3,
  //     },
  //   ];

  async findAll(): Promise<Item[]> {
    // return this.items;
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    // return this.items.find((item) => item.id === id);
    return await this.itemModel.findOne({ _id: id });
  }
  async create(item: Item): Promise<Item> {
    // return this.items.find((item) => item.id === id);
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item> {
    // return this.items.find((item) => item.id === id);
    return await this.itemModel.findByIdAndRemove(id);
  }
  async update(id: string, item: Item): Promise<Item> {
    // return this.items.find((item) => item.id === id);
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
