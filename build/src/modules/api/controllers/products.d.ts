import { MongoRepository } from 'typeorm';
import { Product } from '../../../entities/Product.js';
export declare class ProductController {
    private ProductCollection;
    constructor(ProductCollection: MongoRepository<Product>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
