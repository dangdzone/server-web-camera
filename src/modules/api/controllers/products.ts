
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Product } from '../../../entities/Product.js';


@Controller('livequery/products') // Sản phẩm
export class ProductController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Product) private ProductCollection: MongoRepository<Product>
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
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Product, realtime: true })
    async del() { }

}