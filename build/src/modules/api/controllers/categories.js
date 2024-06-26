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
import { Category } from '../../../entities/Category.js';
import { Owner, WhoCanDoThat } from '../guards/Auth.js';
let CategoryController = class CategoryController {
    CategoryCollection;
    constructor(CategoryCollection) {
        this.CategoryCollection = CategoryCollection;
    }
    async list() { }
    async create() { }
    async patch() { }
    async del() { }
};
__decorate([
    Get(['', ':id']),
    UseTypeormDatasource({ entity: Category, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "list", null);
__decorate([
    Post(),
    WhoCanDoThat(Owner),
    UseTypeormDatasource({ entity: Category, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    Patch(':id'),
    WhoCanDoThat(Owner),
    UseTypeormDatasource({ entity: Category, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "patch", null);
__decorate([
    Delete(':id'),
    UseTypeormDatasource({ entity: Category, realtime: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "del", null);
CategoryController = __decorate([
    Controller('livequery/categories'),
    __param(0, InjectRepository(Category)),
    __metadata("design:paramtypes", [MongoRepository])
], CategoryController);
export { CategoryController };
//# sourceMappingURL=categories.js.map