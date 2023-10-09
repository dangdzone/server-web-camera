
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { RestaurantTable } from '../../../entities/RestaurantTable.js';


@Controller('livequery/restaurants/:restaurant_id/tables') // Món ăn
export class TableController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(RestaurantTable) private TableCollection: MongoRepository<RestaurantTable>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: RestaurantTable, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: RestaurantTable, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: RestaurantTable, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: RestaurantTable, realtime: true })
    async del() { }

}