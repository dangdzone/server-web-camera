import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Resolution } from "../entities/Resolution.js";
import { Brand } from "../entities/Brand.js";
import { Store } from "../entities/Store.js";
import { Cart } from "../entities/Cart.js";
export declare const entities: (typeof Resolution | typeof Brand | typeof Store | typeof Cart)[];
export declare const MongoConnectionInfo: MongoConnectionOptions;
export declare class TypeormConfigModule {
}
