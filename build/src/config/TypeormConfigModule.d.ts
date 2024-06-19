import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Resolution } from "../entities/Resolution.js";
import { Brand } from "../entities/Brand.js";
import { Store } from "../entities/Store.js";
import { Cart } from "../entities/Cart.js";
import { Order } from "../entities/Order.js";
import { Address } from "../entities/Address.js";
export declare const entities: (typeof Resolution | typeof Brand | typeof Store | typeof Cart | typeof Order | typeof Address)[];
export declare const MongoConnectionInfo: MongoConnectionOptions;
export declare class TypeormConfigModule {
}
