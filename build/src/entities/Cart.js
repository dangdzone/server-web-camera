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
let Cart = class Cart extends BaseEntity {
    customer_id;
    product_id;
    amount;
    select;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Cart.prototype, "customer_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Cart.prototype, "product_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Cart.prototype, "amount", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Cart.prototype, "select", void 0);
Cart = __decorate([
    Entity('carts')
], Cart);
export { Cart };
//# sourceMappingURL=Cart.js.map