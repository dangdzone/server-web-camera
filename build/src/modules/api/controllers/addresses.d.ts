import { MongoRepository } from 'typeorm';
import { Address } from '../../../entities/Address.js';
import { ObjectId } from 'mongodb';
export declare class AddressController {
    private AddressCollection;
    constructor(AddressCollection: MongoRepository<Address>);
    list(): Promise<void>;
    create(body: Address, res: {
        item: {
            id: ObjectId;
        };
    }): Promise<import("typeorm").Document | import("typeorm/driver/mongodb/typings.js").UpdateResult>;
    patch(body: Address, address_id: string): Promise<import("typeorm").Document | import("typeorm/driver/mongodb/typings.js").UpdateResult>;
    del(address_id: string): Promise<void>;
}
