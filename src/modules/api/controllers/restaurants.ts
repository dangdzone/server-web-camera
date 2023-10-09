
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Restaurant } from '../../../entities/Restaurant.js';


@Controller('livequery/restaurants') // Món ăn
export class RestaurantController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Restaurant) private RestaurantCollection: MongoRepository<Restaurant>
    ) { }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async del() { }

}