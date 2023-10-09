
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';


@Controller('livequery/restaurants/:restaurant_id') // Món ăn
export class OrderController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Order) private OrderCollection: MongoRepository<Order>
    ) {
    }

    @Get(['orders', 'orders/:id'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async del() { }

}