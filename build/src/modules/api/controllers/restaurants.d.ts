import { MongoRepository } from 'typeorm';
import { Restaurant } from '../../../entities/Restaurant.js';
import { FirebaseUser } from '../decoraters/FirebaseUser.js';
import { ObjectId } from 'mongodb';
import { Category } from '../../../entities/Category.js';
import { RestaurantTable } from '../../../entities/RestaurantTable.js';
export declare class RestaurantController {
    private RestaurantCollection;
    private $Category;
    private $Table;
    constructor(RestaurantCollection: MongoRepository<Restaurant>, $Category: MongoRepository<Category>, $Table: MongoRepository<RestaurantTable>);
    get(): Promise<void>;
    list(): Promise<void>;
    create(res: {
        item: {
            id: ObjectId;
        };
    }, user: FirebaseUser): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
