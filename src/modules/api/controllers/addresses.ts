
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { Address } from '../../../entities/Address.js';
import { ObjectId } from 'mongodb';

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
    // @UseTypeormDatasource({ entity: Address, realtime: true })
    async create(
        @Body() body: Address,
        // @LivequeryResponse() res: { item: { id: ObjectId } }
    ) {

        // id address vừa tạo
        // const address_id = res.item.id.toString()

        if (body.default == true) {
            await this.AddressCollection.updateMany({}, { $set: { default: false } })
            this.AddressCollection.save(
                { ...new Address(), ...body }
            )
        }

        if (body.default == false) {

            const addressAll = await this.AddressCollection.find()
            const defaultList = addressAll.map(a => a.default).includes(true)

            if (defaultList) {
                await this.AddressCollection.save(
                    { ...new Address(), ...body }
                )
            } else {
                await this.AddressCollection.save(
                    { ...new Address(), ...body, default: true }
                )
            }
        }
    }

    @Patch(':id')
    @WhoCanDoThat(Logged)
    @UseTypeormDatasource({ entity: Address, realtime: true })
    async patch(
        @Body() body: Address,
        @Param('id') address_id: string
    ) {

        if (body.default == true) {
            
            await this.AddressCollection.updateMany({}, { $set: { default: false } })
            return await this.AddressCollection.updateOne(
                { _id: new ObjectId(address_id) }, { $set: { default: true } }
            )
            
        }

        if (body.default == false) {

            const addressAll = await this.AddressCollection.find()
            const defaultList = addressAll.map(a => a.default).includes(true)

            !defaultList && await this.AddressCollection.updateOne(
                { _id: new ObjectId(address_id) }, { $set: { default: true } }
            )

        }
    }

    @Delete(':id')
    // @UseTypeormDatasource({ entity: Address, realtime: true })
    async del(
        @Param('id') address_id: string
    ) {

        const address = await this.AddressCollection.findOne(
            { where: { _id: new ObjectId(address_id) } }
        )

        const addressDefault = address.default

        !addressDefault && await this.AddressCollection.deleteOne(
            { _id: new ObjectId(address_id) }
        )

        if (addressDefault) {

            const addressAll = await this.AddressCollection.find()

            if (addressAll.length > 1) {

                const addressOne = addressAll.filter(address => address.id.toString() !== address_id)
                const addressId = addressOne[0].id.toString()
                const update = await this.AddressCollection.updateOne(
                    { _id: new ObjectId(addressId) }, { $set: { default: true } }
                )

                update && await this.AddressCollection.deleteOne(
                    { _id: new ObjectId(address_id) }
                )

            } else {
                await this.AddressCollection.deleteOne(
                    { _id: new ObjectId(address_id) }
                )
            }
        }

    }

}