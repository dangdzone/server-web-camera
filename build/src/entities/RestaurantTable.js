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
let RestaurantTable = class RestaurantTable extends BaseEntity {
    name;
    order_ids = [];
    menu_id;
};
__decorate([
    Column(),
    __metadata("design:type", String)
], RestaurantTable.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", Array)
], RestaurantTable.prototype, "order_ids", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RestaurantTable.prototype, "menu_id", void 0);
RestaurantTable = __decorate([
    Entity('tables')
], RestaurantTable);
export { RestaurantTable };
//# sourceMappingURL=RestaurantTable.js.map