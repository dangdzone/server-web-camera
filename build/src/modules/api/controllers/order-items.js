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
import { OrderItem } from '../../../entities/OrderItem.js';
import { Food } from '../../../entities/Food.js';
import { Order } from '../../../entities/Order.js';
import { ObjectId } from 'mongodb';
let OrderItemController = class OrderItemController {
    OrderItemCollection;
    FoodCollection;
    OrderCollection;
    constructor(OrderItemCollection, FoodCollection, OrderCollection) {
        this.OrderItemCollection = OrderItemCollection;
        this.FoodCollection = FoodCollection;
        this.OrderCollection = OrderCollection;
    }
    async list() { }
    async post(body, order_id) {
        const food = await this.FoodCollection.findOne({ where: { _id: new ObjectId(body.id) } });
        if (!food) {
            throw { code: 'FOOD_NOT_FOUND' };
        }
        const order_info = await this.OrderCollection.findOne({ where: { _id: new ObjectId(order_id) } });
        if (!order_info) {
            throw { code: 'ORDER_NOT_FOUND' };
        }
        const created_order_item = await this.OrderItemCollection.save({
            ...new OrderItem(),
            ...body,
            price: food.price,
            order_id,
            food_id: food.id,
            restaurant_id: food.restaurant_id
        });
        await this.OrderCollection.updateMany({ _id: new ObjectId(order_id) }, {
            $inc: {
                total: food.price * body.amount
            }
        });
        return {
            data: {
                item: created_order_item
            }
        };
    }
    async patch(body) {
        const food = await this.FoodCollection.findOne({ where: { _id: new ObjectId(body.food_id) } });
        if (!food) {
            throw { code: 'FOOD_NOT_FOUND' };
        }
        const order_info = await this.OrderCollection.findOne({ where: { _id: new ObjectId(body.order_id) } });
        if (!order_info) {
            throw { code: 'ORDER_NOT_FOUND' };
        }
        const update_order_item = await this.OrderItemCollection.updateMany({ _id: new ObjectId(order_info.id) }, {
            $set: {
                status: body.status
            }
        });
        const result = await this.OrderCollection.aggregate([
            {
                $match: {
                    _id: body.order_id,
                    status: { $ne: "cancel" }
                }
            },
            {
                $unwind: order_info
            },
            {
                $match: {
                    status: { $ne: "cancel" }
                }
            },
            {
                $group: {
                    _id: order_info.id,
                    total: { $sum: { $multiply: [body.amount, body.price] } }
                }
            }
        ]);
        return {
            data: {
                item: update_order_item
            }
        };
    }
    async del() { }
};
__decorate([
    Get(['', ':id']),
    UseTypeormDatasource({ entity: OrderItem, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "list", null);
__decorate([
    Post(),
    __param(0, Body()),
    __param(1, Param('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderItem, String]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "post", null);
__decorate([
    Patch(':id'),
    UseTypeormDatasource({ entity: OrderItem, realtime: true }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [OrderItem]),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "patch", null);
__decorate([
    Delete(':id'),
    UseTypeormDatasource({ entity: OrderItem, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemController.prototype, "del", null);
OrderItemController = __decorate([
    Controller('livequery/restaurants/:restaurant_id/orders/:order_id/order-items'),
    __param(0, InjectRepository(OrderItem)),
    __param(1, InjectRepository(Food)),
    __param(2, InjectRepository(Order)),
    __metadata("design:paramtypes", [MongoRepository,
        MongoRepository,
        MongoRepository])
], OrderItemController);
export { OrderItemController };
//# sourceMappingURL=order-items.js.map