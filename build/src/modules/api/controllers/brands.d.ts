import { MongoRepository } from 'typeorm';
import { Brand } from '../../../entities/Brand.js';
export declare class BrandController {
    private BrandCollection;
    constructor(BrandCollection: MongoRepository<Brand>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
