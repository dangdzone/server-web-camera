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
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Cart } from '../../../entities/Cart.js';
let CartController = class CartController {
    CartCollection;
    constructor(CartCollection) {
        this.CartCollection = CartCollection;
    }
    async list() { }
    async create(body) {
        const product_id = body.product_id;
        console.log({ product_id });
        const cart = await this.CartCollection.findOne({
            where: { product_id: body.product_id }
        });
        if (cart) {
            cart.amount += 1;
            await this.CartCollection.save(cart);
            console.log('Đã cập nhật ');
        }
        else {
            const newCart = this.CartCollection.create({
                product_id: product_id,
                amount: 1,
                select: body.select || false
            });
            await this.CartCollection.save(newCart);
            console.log('Đã thêm mới');
        }
    }
    async patch() { }
    async del() { }
};
__decorate([
    Get(['', ':id']),
    UseTypeormDatasource({ entity: Cart, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "list", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Cart]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "create", null);
__decorate([
    Patch(':id'),
    UseTypeormDatasource({ entity: Cart, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "patch", null);
__decorate([
    Delete(':id'),
    UseTypeormDatasource({ entity: Cart, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "del", null);
CartController = __decorate([
    Controller('livequery/carts'),
    __param(0, InjectRepository(Cart)),
    __metadata("design:paramtypes", [MongoRepository])
], CartController);
export { CartController };
//# sourceMappingURL=carts.js.map