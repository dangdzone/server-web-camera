
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';


@Controller('livequery') // Đơn hàng
export class OrderController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Order) private OrderCollection: MongoRepository<Order>,
        @InjectRepository(Cart) private CartCollection: MongoRepository<Cart>
    ) { }

    // Orders of all customers
    @Get(['orders', ':id'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async listALL() { }

    // Orders of 1 customers
    @Get(['customers/:uid/orders', 'customers/:uid/orders/:id'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async listCustomerId(

    ) {

    }

    @Post(['orders'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async create(
        @Body() body: Order
    ) {
        // const newOrder = await this.OrderCollection.create({
        //     ...body,
        // })
        // // Tạo đơn hàng
        // await this.OrderCollection.save(newOrder)

        // Xóa sản phẩm trong giỏ chọn khi tạo đơn hàng
        await this.CartCollection.deleteMany({ select: true })

        // return {
        //     data: {
        //         item: newOrder
        //     }
        // }
    }

    @Patch('orders/:id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async patch(

    ) { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async del() { }

}