
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Product } from '../../../entities/Product.js';
import { Cart } from '../../../entities/Cart.js';

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
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async patch(
        @Body() body: Product,
        @Param('id') id: string // Lấy id sản phẩm cập nhật
    ) {

        // Check xem sản phẩm cập nhật có trong cart không ?
        const cart_item = await this.CartCollection.findOne(
            { where: { product_id: id } }
        )

        // Nếu có sản phẩm trong giỏ hàng
        if (cart_item) {
            //check xem amount vừa cập nhật nó có nhỏ hơn amount của sản phẩm trong giỏ hàng không 
            const check_amount = cart_item.amount > body.amount
            if (check_amount) {
                await this.CartCollection.updateOne(
                    { product_id: id },
                    { $set: { amount: body.amount } }
                )
            }
            if (body.amount > 0 && cart_item.amount == 0) {
                await this.CartCollection.updateOne(
                    { product_id: id },
                    { $set: { amount: 1 } }
                )
            }

        }

    }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async del() { }

}