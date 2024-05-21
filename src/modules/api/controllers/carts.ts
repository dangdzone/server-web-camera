
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Cart } from '../../../entities/Cart.js';


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
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Cart, realtime: true })
    async del() { }

}