
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Brand } from '../../../entities/Brand.js';
import { Owner, WhoCanDoThat } from '../guards/Auth.js';


@Controller('livequery/brands') // Thương hiệu
export class BrandController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Brand) private BrandCollection: MongoRepository<Brand>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Brand, realtime: true })
    async list() { }

    @Post()
    @WhoCanDoThat(Owner)
    @UseTypeormDatasource({ entity: Brand, realtime: true })
    async create() { }

    @Patch(':id')
    @WhoCanDoThat(Owner)
    @UseTypeormDatasource({ entity: Brand, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Brand, realtime: true })
    async del() { }

}