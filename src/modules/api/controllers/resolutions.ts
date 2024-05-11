
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Resolution } from '../../../entities/Resolution.js';


@Controller('livequery/resolutions') // Độ phân giải
export class ResolutionController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Resolution) private ResolutionCollection: MongoRepository<Resolution>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Resolution, realtime: true })
    async list() { }

    @Post()
    @UseTypeormDatasource({ entity: Resolution, realtime: true })
    async create() { }

    @Patch(':id')
    @UseTypeormDatasource({ entity: Resolution, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Resolution, realtime: true })
    async del() { }

}