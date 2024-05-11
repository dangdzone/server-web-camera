import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions.js";
import { Resolution } from "../entities/Resolution.js";
import { Brand } from "../entities/Brand.js";
export declare const entities: (typeof Resolution | typeof Brand)[];
export declare const MongoConnectionInfo: MongoConnectionOptions;
export declare class TypeormConfigModule {
}
