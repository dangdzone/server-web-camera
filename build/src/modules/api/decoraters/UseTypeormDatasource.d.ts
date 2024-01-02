import { RouteOptions } from '@livequery/typeorm';
import { Provider } from '@nestjs/common';
declare const UseTypeormDatasource: (options: RouteOptions) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const TypeormDatasourceProvider: Provider;
export declare const MongoDBRealtimeProvider: Provider;
export { UseTypeormDatasource };
