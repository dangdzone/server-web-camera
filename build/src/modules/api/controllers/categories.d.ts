import { MongoRepository } from 'typeorm';
import { Category } from '../../../entities/Category.js';
export declare class CategoryController {
    private CategoryCollection;
    constructor(CategoryCollection: MongoRepository<Category>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
