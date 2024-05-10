
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Category } from "../entities/Category.js";

export const entities = [
    Category,
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