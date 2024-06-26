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
import { Order } from '../../../entities/Order.js';
import { Cart } from '../../../entities/Cart.js';
import { Logged, WhoCanDoThat } from '../guards/Auth.js';
let OrderController = class OrderController {
    OrderCollection;
    CartCollection;
    constructor(OrderCollection, CartCollection) {
        this.OrderCollection = OrderCollection;
        this.CartCollection = CartCollection;
    }
    async listALL() { }
    async listCustomer() { }
    async create() {
        await this.CartCollection.deleteMany({ select: true });
    }
    async patch() { }
    async del() { }
};
__decorate([
    Get(['orders', ':id']),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listALL", null);
__decorate([
    Get(['customers/:customer_id/orders', 'customers/:customer_id/orders/:id']),
    WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listCustomer", null);
__decorate([
    Post(['orders']),
    WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    Patch('orders/:id'),
    WhoCanDoThat(Logged, ctx => ctx.req.params.uid == ctx.req.user.uid),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "patch", null);
__decorate([
    Delete('orders/:id'),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "del", null);
OrderController = __decorate([
    Controller('livequery'),
    __param(0, InjectRepository(Order)),
    __param(1, InjectRepository(Cart)),
    __metadata("design:paramtypes", [MongoRepository,
        MongoRepository])
], OrderController);
export { OrderController };
//# sourceMappingURL=orders.js.map