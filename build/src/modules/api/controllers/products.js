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
import { Product } from '../../../entities/Product.js';
import { Cart } from '../../../entities/Cart.js';
let ProductController = class ProductController {
    ProductCollection;
    CartCollection;
    constructor(ProductCollection, CartCollection) {
        this.ProductCollection = ProductCollection;
        this.CartCollection = CartCollection;
    }
    async list() { }
    async create() { }
    async patch(body, id) {
        const cart_item = await this.CartCollection.findOne({ where: { product_id: id } });
        if (cart_item) {
            const check_amount = cart_item.amount > body.amount;
            if (check_amount) {
                await this.CartCollection.updateOne({ product_id: id }, { $set: { amount: body.amount } });
            }
            if (body.amount > 0 && cart_item.amount == 0) {
                await this.CartCollection.updateOne({ product_id: id }, { $set: { amount: 1 } });
            }
        }
    }
    async del() { }
};
__decorate([
    Get(['', ':id']),
    UseTypeormDatasource({ entity: Product, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "list", null);
__decorate([
    Post(),
    UseTypeormDatasource({ entity: Product, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    Patch(':id'),
    UseTypeormDatasource({ entity: Product, realtime: true }),
    __param(0, Body()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Product, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "patch", null);
__decorate([
    Delete(':id'),
    UseTypeormDatasource({ entity: Product, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "del", null);
ProductController = __decorate([
    Controller('livequery/products'),
    __param(0, InjectRepository(Product)),
    __param(1, InjectRepository(Cart)),
    __metadata("design:paramtypes", [MongoRepository,
        MongoRepository])
], ProductController);
export { ProductController };
//# sourceMappingURL=products.js.map