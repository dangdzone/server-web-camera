import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Food } from "../entities/Food.js";
import { Restaurant } from "../entities/Restaurant.js";
import { Order } from "../entities/Order.js";
import { Category } from "../entities/Category.js";
import { OrderItem } from "../entities/OrderItem.js";
import { RestaurantTable } from "../entities/RestaurantTable.js";
export declare const entities: (typeof Food | typeof Restaurant | typeof Order | typeof Category | typeof OrderItem | typeof RestaurantTable)[];
export declare const MongoConnectionInfo: MongoConnectionOptions;
export declare class TypeormConfigModule {
}
