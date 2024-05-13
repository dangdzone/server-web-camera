
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Store } from '../../../entities/Store.js';


@Controller('livequery/stores') // Danh mục
export class StoreController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Store) private StoreCollection: MongoRepository<Store>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Store, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Store, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Store, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Store, realtime: true })
    async del() { }

}