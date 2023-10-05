import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { UseTypeormDatasource } from '@livequery/typeorm'
import { Food } from '../../../entities/Food';
import { ObjectId } from "mongodb"


@Controller('livequery/restaurants/:restaurant_id/foods') // Món ăn
export class FoodRestaurantController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Food) private FoodCollection: MongoRepository<Food>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Food, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Food, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Food, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Food, realtime: true })
    async del() { }

}