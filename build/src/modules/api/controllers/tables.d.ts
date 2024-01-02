import { MongoRepository } from 'typeorm';
import { RestaurantTable } from '../../../entities/RestaurantTable.js';
export declare class TableController {
    private TableCollection;
    constructor(TableCollection: MongoRepository<RestaurantTable>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
