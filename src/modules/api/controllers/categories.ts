
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Category } from '../../../entities/Category.js';


@Controller('livequery/categories') // Danh mục
export class CategoryController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Category) private CategoryCollection: MongoRepository<Category>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Category, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Category, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Category, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Category, realtime: true })
    async del() { }

}