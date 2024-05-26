import { MongoRepository } from 'typeorm';
import { Product } from '../../../entities/Product.js';
import { Cart } from '../../../entities/Cart.js';
export declare class ProductController {
    private ProductCollection;
    private CartCollection;
    constructor(ProductCollection: MongoRepository<Product>, CartCollection: MongoRepository<Cart>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(body: Product, id: string): Promise<void>;
    del(): Promise<void>;
}
