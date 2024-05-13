import { MongoRepository } from 'typeorm';
import { Store } from '../../../entities/Store.js';
export declare class StoreController {
    private StoreCollection;
    constructor(StoreCollection: MongoRepository<Store>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
