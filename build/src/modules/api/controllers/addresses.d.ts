import { MongoRepository } from 'typeorm';
import { Address } from '../../../entities/Address.js';
export declare class AddressController {
    private AddressCollection;
    constructor(AddressCollection: MongoRepository<Address>);
    list(): Promise<void>;
    create(body: Address): Promise<void>;
    patch(body: Address, address_id: string): Promise<import("typeorm").Document | import("typeorm/driver/mongodb/typings.js").UpdateResult>;
    del(address_id: string): Promise<void>;
}
