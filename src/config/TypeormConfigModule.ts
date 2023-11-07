
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Food } from "../entities/Food.js";
import { Restaurant } from "../entities/Restaurant.js";
import { Order } from "../entities/Order.js";
import { Category } from "../entities/Category.js";
import { OrderItem } from "../entities/OrderItem.js";
import { RestaurantTable } from "../entities/RestaurantTable.js";

export const entities = [
    Order,
    Category,
    Food,
    OrderItem,
    Restaurant,
    RestaurantTable,
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