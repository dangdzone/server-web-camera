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
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Product } from '../../../entities/Product.js';
let ProductController = class ProductController {
    ProductCollection;
    constructor(ProductCollection) {
        this.ProductCollection = ProductCollection;
    }
    async list() { }
    async create() { }
    async patch() { }
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
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
    __metadata("design:paramtypes", [MongoRepository])
], ProductController);
export { ProductController };
//# sourceMappingURL=products.js.map