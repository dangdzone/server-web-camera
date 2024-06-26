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
    code;
    status;
    order_items;
    amount;
    total;
    discount;
    pay;
    shipping_fee;
    customer_id;
    customer_info;
    address_id;
    note;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "code", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], Order.prototype, "order_items", void 0);
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
    __metadata("design:type", Number)
], Order.prototype, "shipping_fee", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customer_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Order.prototype, "customer_info", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "address_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
Order = __decorate([
    Entity('orders')
], Order);
export { Order };
//# sourceMappingURL=Order.js.map