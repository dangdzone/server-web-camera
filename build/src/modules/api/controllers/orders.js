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
import { Repository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';
let OrderController = class OrderController {
    OrderCollection;
    constructor(OrderCollection) {
        this.OrderCollection = OrderCollection;
    }
    async list() { }
    async create() { }
    async patch(status, restaurant_id) {
    }
    async list_orders_by_tables(restaurant_id, table_id) {
        const orders = await this.OrderCollection.find({ where: { table_id } });
        return {
            data: {
                items: orders.map((order) => {
                    return {
                        ...order,
                        id: order.id.toString()
                    };
                })
            }
        };
    }
    async del() { }
};
__decorate([
    Get(['orders', 'orders/:id']),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "list", null);
__decorate([
    Post('orders'),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    Patch('orders/:id'),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __param(0, Body('status')),
    __param(1, Param('restaurant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "patch", null);
__decorate([
    Get(['tables/:table_id/orders', 'tables/:table_id/orders/:id']),
    __param(0, Param('restaurant_id')),
    __param(1, Param('table_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "list_orders_by_tables", null);
__decorate([
    Delete(':id'),
    UseTypeormDatasource({ entity: Order, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "del", null);
OrderController = __decorate([
    Controller('livequery/restaurants/:restaurant_id'),
    __param(0, InjectRepository(Order)),
    __metadata("design:paramtypes", [Repository])
], OrderController);
export { OrderController };
//# sourceMappingURL=orders.js.map