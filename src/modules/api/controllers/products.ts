
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Product } from '../../../entities/Product.js';
import { Cart } from '../../../entities/Cart.js';
import { Owner, WhoCanDoThat } from '../guards/Auth.js';

@Controller('livequery/products') // Sản phẩm
export class ProductController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Product) private ProductCollection: MongoRepository<Product>,
        @InjectRepository(Cart) private CartCollection: MongoRepository<Cart>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async list() { }

    @Post()
    @WhoCanDoThat(Owner)
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async create() { }

    @Patch(':id')
    @WhoCanDoThat(Owner)
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async patch(
        @Body() body: Product,
        @Param('id') id: string // Lấy id sản phẩm cập nhật
    ) {

        if (body.amount <= 0) {
            // Cập nhật lại sản phẩm trong cart
            await this.CartCollection.updateMany(
                { product_id: id },
                { $set: { amount: 0 } }
            )
        }
        if (body.amount >= 1) {
            // Cập nhật lại sản phẩm trong cart
            await this.CartCollection.updateMany(
                { product_id: id, amount: { $gt: body.amount } },
                { $set: { amount: body.amount } }
            )
            await this.CartCollection.updateMany(
                { product_id: id, amount: 0 },
                { $set: { amount: 1 } }
            )
        }

    }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async del() { }

}