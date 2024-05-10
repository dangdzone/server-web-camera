var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entities/Category.js";
export const entities = [
    Category,
];
export const MongoConnectionInfo = {
    url: process.env.DB_URL,
    entities,
    type: 'mongodb',
    database: process.env.DB_NAME,
    synchronize: true
};
let TypeormConfigModule = class TypeormConfigModule {
};
TypeormConfigModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forRoot(MongoConnectionInfo),
            TypeOrmModule.forFeature(entities)
        ],
        exports: [
            TypeOrmModule
        ]
    })
], TypeormConfigModule);
export { TypeormConfigModule };
//# sourceMappingURL=TypeormConfigModule.js.map