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
import { Restaurant } from '../../../entities/Restaurant.js';
import { Logged, Owner, RestaurantOwner, WhoCanDoThat } from '../guards/Auth.js';
import { LivequeryResponse } from '@livequery/nestjs';
import { FirebaseUser } from '../decoraters/FirebaseUser.js';
import Firebase from "firebase-admin";
import { Category } from '../../../entities/Category.js';
import { RestaurantTable } from '../../../entities/RestaurantTable.js';
let RestaurantController = class RestaurantController {
    RestaurantCollection;
    $Category;
    $Table;
    constructor(RestaurantCollection, $Category, $Table) {
        this.RestaurantCollection = RestaurantCollection;
        this.$Category = $Category;
        this.$Table = $Table;
    }
    async get() {
    }
    async list() {
    }
    async create(res, user) {
        const restaurant_id = res.item.id.toString();
        await Firebase.auth().setCustomUserClaims(user.uid, {
            $: {
                ...user.$,
                [restaurant_id]: 'owner',
            }
        });
        await this.$Category.save({
            ...new Category(),
            restaurant_id,
            name: 'Món khai vị',
        });
        await this.$Table.save({
            ...new RestaurantTable(),
            restaurant_id,
            name: 'Bàn A1',
        });
    }
    async patch() { }
    async del() { }
};
__decorate([
    Get('restaurants/:id'),
    UseTypeormDatasource({ entity: Restaurant, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "get", null);
__decorate([
    Get('owners/:owner_id/restaurants'),
    WhoCanDoThat(Owner),
    UseTypeormDatasource({ entity: Restaurant, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "list", null);
__decorate([
    Post('owners/:owner_id/restaurants'),
    WhoCanDoThat(Logged),
    UseTypeormDatasource({ entity: Restaurant, realtime: true }),
    __param(0, LivequeryResponse()),
    __param(1, FirebaseUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    Patch('restaurants/:id'),
    WhoCanDoThat(RestaurantOwner),
    UseTypeormDatasource({ entity: Restaurant, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "patch", null);
__decorate([
    Delete('restaurants/:id/~close'),
    UseTypeormDatasource({ entity: Restaurant, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "del", null);
RestaurantController = __decorate([
    Controller('livequery'),
    __param(0, InjectRepository(Restaurant)),
    __param(1, InjectRepository(Category)),
    __param(2, InjectRepository(RestaurantTable)),
    __metadata("design:paramtypes", [MongoRepository,
        MongoRepository,
        MongoRepository])
], RestaurantController);
export { RestaurantController };
//# sourceMappingURL=restaurants.js.map