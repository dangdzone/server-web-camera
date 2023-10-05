import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entities/Category";
import { Food } from "../entities/Food";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Restaurant } from "../entities/Restaurant";
import { RestaurantTable } from "../entities/RestaurantTable";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

export const entities = [
    Order,
    Category,
    Food,
    OrderItem,
    Restaurant,
    RestaurantTable,
]

export const MongoConnectionInfo: MongoConnectionOptions = {
    url: process.env.MONGODB_URL,
    entities,
    type: 'mongodb',
    database: process.env.MONGODB_DB,
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