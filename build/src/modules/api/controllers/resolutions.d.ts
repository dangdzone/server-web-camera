import { MongoRepository } from 'typeorm';
import { Resolution } from '../../../entities/Resolution.js';
export declare class ResolutionController {
    private ResolutionCollection;
    constructor(ResolutionCollection: MongoRepository<Resolution>);
    list(): Promise<void>;
    create(): Promise<void>;
    patch(): Promise<void>;
    del(): Promise<void>;
}
