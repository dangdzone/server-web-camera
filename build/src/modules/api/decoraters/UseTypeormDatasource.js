import { createDatasourceMapper, LivequeryWebsocketSync } from '@livequery/nestjs';
import { listenMongoDBDataChange } from '@livequery/mongodb-mapper';
import { TypeormDatasource } from '@livequery/typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
const [UseTypeormDatasource, list] = createDatasourceMapper(TypeormDatasource);
export const TypeormDatasourceProvider = {
    provide: TypeormDatasource,
    useFactory: async (...ds) => new TypeormDatasource(ds, list()),
    inject: [getDataSourceToken()]
};
export const MongoDBRealtimeProvider = {
    provide: Symbol(),
    inject: [LivequeryWebsocketSync, TypeormDatasource],
    useFactory: async (ws, tds) => {
        if (!process.env.DB_URL)
            throw new Error('MISSING_MONGODB_URL');
        if (!process.env.DB_NAME)
            throw new Error('MISSING_MONGODB_DATABASE');
        listenMongoDBDataChange({
            database: process.env.DB_NAME,
            url: process.env.DB_URL
        })
            .pipe(tds.pipe2websocket(), ws.pipe2websocket())
            .subscribe();
    }
};
export { UseTypeormDatasource };
//# sourceMappingURL=UseTypeormDatasource.js.map