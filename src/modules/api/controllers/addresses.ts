
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { Address } from '../../../entities/Address.js';


@Controller('livequery/customers/:customer_id/addresses') // Thương hiệu
export class AddressController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Address) private AddressCollection: MongoRepository<Address>
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: Address, realtime: true })
    async list() { }

    @Post()
    @WhoCanDoThat(Logged)
    @UseTypeormDatasource({ entity: Address, realtime: true })
    async create() { }

    @Patch(':id')
    @WhoCanDoThat(Logged)
    @UseTypeormDatasource({ entity: Address, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Address, realtime: true })
    async del() { }

}