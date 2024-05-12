var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
let Product = class Product extends BaseEntity {
    name;
    image;
    cost;
    price;
    advertising_price;
    brand_id;
    code;
    description;
    resolution_id;
    amount;
    product_info;
    specifications;
    category_id;
    option;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "cost", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "advertising_price", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "brand_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "resolution_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "amount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], Product.prototype, "product_info", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], Product.prototype, "specifications", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "category_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], Product.prototype, "option", void 0);
Product = __decorate([
    Entity('products')
], Product);
export { Product };
//# sourceMappingURL=Product.js.map