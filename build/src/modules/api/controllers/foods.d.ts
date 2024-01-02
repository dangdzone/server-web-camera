import { MongoRepository } from 'typeorm';
import { Food } from '../../../entities/Food.js';
export declare class FoodRestaurantController {
    private FoodCollection;
    constructor(FoodCollection: MongoRepository<Food>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
