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
let Address = class Address extends BaseEntity {
    customer_id;
    name;
    phone;
    province;
    district;
    ward;
    street;
    default;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "customer_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "phone", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Address.prototype, "province", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Address.prototype, "district", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Address.prototype, "ward", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Address.prototype, "street", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], Address.prototype, "default", void 0);
Address = __decorate([
    Entity('addresses')
], Address);
export { Address };
//# sourceMappingURL=Address.js.map