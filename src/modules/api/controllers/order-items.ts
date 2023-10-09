
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { OrderItem } from '../../../entities/OrderItem.js';


@Controller('livequery/restaurants/:restaurant_id/orders/:order_id/order-items') // Món ăn
export class OrderItemController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(OrderItem) private OrderItemCollection: MongoRepository<OrderItem>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async del() { }

}