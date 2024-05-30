
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Cart } from '../../../entities/Cart.js';
import { Logged, Owner, WhoCanDoThat } from '../guards/Auth.js';

@Controller('livequery/customers/:customer_id/carts') // Giỏ hàng
export class CartController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Cart) private CartCollection: MongoRepository<Cart>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async list() { }

    @Post()
    @WhoCanDoThat(Logged)
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async create(
    ) { }

    @Patch()
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    async patchALL(
        @Body() body: Cart
    ) {
        // Lấy thông tin sản phẩm có trong giỏ hàng hay không
        const cart = await this.CartCollection.findOne({
            where: { product_id: body.product_id, customer_id: body.customer_id }
        })

        if (cart) { // Nếu có product_id trong giỏ thì cập nhật
            cart.amount += 1
            await this.CartCollection.save(cart)
            // console.log('Đã cập nhật ')
        }
    }

    @Patch(':id')
    @WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid)
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async del() { }

}