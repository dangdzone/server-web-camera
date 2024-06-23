var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
import { Address } from '../../../entities/Address.js';
import { ObjectId } from 'mongodb';
let AddressController = class AddressController {
    AddressCollection;
    constructor(AddressCollection) {
        this.AddressCollection = AddressCollection;
    }
    async list() { }
    async create(body) {
        if (body.default == true) {
            await this.AddressCollection.updateMany({}, { $set: { default: false } });
            this.AddressCollection.save({ ...new Address(), ...body });
        }
        if (body.default == false) {
            const addressAll = await this.AddressCollection.find();
            const defaultList = addressAll.map(a => a.default).includes(true);
            if (defaultList) {
                await this.AddressCollection.save({ ...new Address(), ...body });
            }
            else {
                await this.AddressCollection.save({ ...new Address(), ...body, default: true });
            }
        }
    }
    async patch(body, address_id) {
        if (body.default == true) {
            await this.AddressCollection.updateMany({}, { $set: { default: false } });
            return await this.AddressCollection.updateOne({ _id: new ObjectId(address_id) }, { $set: { default: true } });
        }
        if (body.default == false) {
            const addressAll = await this.AddressCollection.find();
            const defaultList = addressAll.map(a => a.default).includes(true);
            !defaultList && await this.AddressCollection.updateOne({ _id: new ObjectId(address_id) }, { $set: { default: true } });
        }
    }
    async del(address_id) {
        const address = await this.AddressCollection.findOne({ where: { _id: new ObjectId(address_id) } });
        const addressDefault = address.default;
        !addressDefault && await this.AddressCollection.deleteOne({ _id: new ObjectId(address_id) });
        if (addressDefault) {
            const addressAll = await this.AddressCollection.find();
            if (addressAll.length > 1) {
                const addressOne = addressAll.filter(address => address.id.toString() !== address_id);
                const addressId = addressOne[0].id.toString();
                const update = await this.AddressCollection.updateOne({ _id: new ObjectId(addressId) }, { $set: { default: true } });
                update && await this.AddressCollection.deleteOne({ _id: new ObjectId(address_id) });
            }
            else {
                await this.AddressCollection.deleteOne({ _id: new ObjectId(address_id) });
            }
        }
    }
};
__decorate([
    Get(['', ':id']),
    UseTypeormDatasource({ entity: Address, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "list", null);
__decorate([
    Post(),
    WhoCanDoThat(Logged),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Address]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "create", null);
__decorate([
    Patch(':id'),
    WhoCanDoThat(Logged),
    UseTypeormDatasource({ entity: Address, realtime: true }),
    __param(0, Body()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Address, String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "patch", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "del", null);
AddressController = __decorate([
    Controller('livequery/customers/:customer_id/addresses'),
    __param(0, InjectRepository(Address)),
    __metadata("design:paramtypes", [MongoRepository])
], AddressController);
export { AddressController };
//# sourceMappingURL=addresses.js.map