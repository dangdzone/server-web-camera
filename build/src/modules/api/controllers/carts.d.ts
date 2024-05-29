import { MongoRepository } from 'typeorm';
import { Cart } from '../../../entities/Cart.js';
export declare class CartController {
    private CartCollection;
    constructor(CartCollection: MongoRepository<Cart>);
    list(): Promise<void>;
    create(): Promise<void>;
    patchALL(body: Cart): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
