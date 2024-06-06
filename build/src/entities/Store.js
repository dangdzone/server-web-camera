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
let Store = class Store extends BaseEntity {
    name;
    province;
    district;
    ward;
    street;
    link_map;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Store.prototype, "province", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Store.prototype, "district", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Store.prototype, "ward", void 0);
__decorate([
    Column(),
    __metadata("design:type", Object)
], Store.prototype, "street", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Store.prototype, "link_map", void 0);
Store = __decorate([
    Entity('stores')
], Store);
export { Store };
//# sourceMappingURL=Store.js.map