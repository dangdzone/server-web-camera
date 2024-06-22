
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';

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
    @Get(['customers/:customer_id/orders', 'customers/:customer_id/orders/:id'])
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async listCustomer() { }

    @Post(['orders'])
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async create() {
        // Xóa sản phẩm trong giỏ chọn khi tạo đơn hàng
        await this.CartCollection.deleteMany({ select: true })
    }

    @Patch('orders/:id')
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async patch() { }

    @Delete('orders/:id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async del() { }

}