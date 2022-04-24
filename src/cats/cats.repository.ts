import { CatRequestDto } from './dtos/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email }); // 존재하지 않으면 null이 반환됨
    return result ? true : false;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }

  async getAllCat(): Promise<Array<Cat>> {
    return this.catModel.find();
  }
}
