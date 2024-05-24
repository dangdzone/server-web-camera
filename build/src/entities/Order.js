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
let Order = class Order extends BaseEntity {
    name;
    status;
    image;
    orrder_item;
    amount;
    total;
    discount;
    pay;
    transport_fee;
    customer_id;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "image", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], Order.prototype, "orrder_item", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Order.prototype, "pay", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Order.prototype, "transport_fee", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customer_id", void 0);
Order = __decorate([
    Entity('orders')
], Order);
export { Order };
//# sourceMappingURL=Order.js.map