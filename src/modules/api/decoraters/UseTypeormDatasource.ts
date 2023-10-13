import { createDatasourceMapper, LivequeryWebsocketSync } from '@livequery/nestjs'
import { listenMongoDBDataChange } from '@livequery/mongodb-mapper'
import { RouteOptions, TypeormDatasource } from '@livequery/typeorm'
import { Provider } from '@nestjs/common'
import { getDataSourceToken } from '@nestjs/typeorm'
import { tap } from 'rxjs'
import { DataSource } from 'typeorm'

const [
    UseTypeormDatasource,
    list
] = createDatasourceMapper<RouteOptions>(TypeormDatasource)

export const TypeormDatasourceProvider: Provider = {
    provide: TypeormDatasource,
    useFactory: async (...ds: DataSource[]) => new TypeormDatasource(ds, list()),
    inject: [getDataSourceToken()]
}

export const MongoDBRealtimeProvider: Provider = {
    provide: Symbol(),
    inject: [LivequeryWebsocketSync, TypeormDatasource],
    useFactory: async (ws: LivequeryWebsocketSync, tds: TypeormDatasource) => {
        if (!process.env.DB_URL) throw new Error('MISSING_MONGODB_URL')
        if (!process.env.DB_NAME) throw new Error('MISSING_MONGODB_DATABASE')

        listenMongoDBDataChange<{ id: string }>({
            database: process.env.DB_NAME,
            url: process.env.DB_URL
        })
            .pipe(
                tds.pipe2websocket(),
                ws.pipe2websocket()
            )
            .subscribe()

    }
}

export { UseTypeormDatasource }