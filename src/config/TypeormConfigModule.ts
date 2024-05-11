
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Category } from "../entities/Category.js";
import { Resolution } from "../entities/Resolution.js";
import { Brand } from "../entities/Brand.js";
import { Product } from "../entities/Product.js";

export const entities = [
    Category,
    Resolution,
    Brand,
    Product
]

// Kết nối database
export const MongoConnectionInfo: MongoConnectionOptions = {
    url: process.env.DB_URL,
    entities,
    type: 'mongodb',
    database: process.env.DB_NAME,
    synchronize: true
}

@Module({
    imports: [
        TypeOrmModule.forRoot(MongoConnectionInfo),
        TypeOrmModule.forFeature(entities)
    ],
    exports: [
        TypeOrmModule
    ]
})
export class TypeormConfigModule { }