
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';


@Controller('livequery/orders') // Đơn hàng
export class OrderController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Order) private OrderCollection: MongoRepository<Order>,
        @InjectRepository(Cart) private CartCollection: MongoRepository<Cart>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async list() { }

    @Post()
    // @UseTypeormDatasource({ entity: Order, realtime: true })
    async create(
        @Body() body: Order
    ) {
        const newOrder = await this.OrderCollection.create({
            ...body
        })
        // Tạo đơn hàng
        await this.OrderCollection.save(newOrder)
        // Xóa sản phẩm được chọn khi tạo đơn hàng
        await this.CartCollection.deleteMany({ select: true })

        return {
            data: {
                item: newOrder
            }
        }
    }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async patch(

    ) { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async del() { }

}