import { MongoRepository } from 'typeorm';
import { Address } from '../../../entities/Address.js';
export declare class AddressController {
    private AddressCollection;
    constructor(AddressCollection: MongoRepository<Address>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
