
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Cart } from '../../../entities/Cart.js';
import { LivequeryResponse } from '@livequery/nestjs';
import { ObjectId } from 'mongodb';


@Controller('livequery/carts') // Giỏ hàng
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
    // @UseTypeormDatasource({ entity: Cart, realtime: true })
    async create(
        @Body() body: Cart // thông tin sản phẩm được gửi từ client
    ) { 
        const product_id = body.product_id
        
        // Lấy thông tin sản phẩm có trong giỏ hàng hay không
        const cart =  await this.CartCollection.findOne({
            where: { product_id: body.product_id }
        })

        if(cart) { // Nếu có product_id trong giỏ thì cập nhật
            cart.amount += 1
            await this.CartCollection.save(cart)
            // console.log('Đã cập nhật ')
        } else { // Nếu không có product_id trong giỏ thì thêm mới
            const newCart = this.CartCollection.create({
                product_id: product_id,
                amount: 1,
                select: body.select || false
            });
            await this.CartCollection.save(newCart)
            // console.log('Đã thêm mới')
        }

    }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async del() { }

}