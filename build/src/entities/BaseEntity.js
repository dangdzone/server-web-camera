var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, ObjectIdColumn } from "typeorm";
export class BaseEntity {
    constructor() {
        this.created_at = Date.now();
    }
    id;
    created_at;
    updated_at;
    owner_id;
    permissions;
}
__decorate([
    ObjectIdColumn({ name: '_id' }),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "created_at", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], BaseEntity.prototype, "updated_at", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], BaseEntity.prototype, "owner_id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Object)
], BaseEntity.prototype, "permissions", void 0);
//# sourceMappingURL=BaseEntity.js.map