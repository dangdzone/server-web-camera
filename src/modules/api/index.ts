
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from '@nestjs/platform-ws'
import BodyParser from "body-parser";
import admin from "firebase-admin"
import { LivequeryInterceptor, LivequeryWebsocketSync } from "@livequery/nestjs";
import { MongoDBRealtimeProvider, TypeormDatasourceProvider } from "./decoraters/UseTypeormDatasource.js";
import { CategoryController } from "./controllers/categories.js";
import { TypeormConfigModule } from "../../config/TypeormConfigModule.js";
import { ResolutionController } from "./controllers/resolutions.js";
import { BrandController } from "./controllers/brands.js";
import { ProductController } from "./controllers/products.js";
import { StoreController } from "./controllers/stores.js";

@Module({
    imports: [TypeormConfigModule],
    controllers: [
        CategoryController,
        ResolutionController,
        BrandController,
        ProductController,
        StoreController
    ],
    providers: [
        LivequeryInterceptor,
        LivequeryWebsocketSync,
        MongoDBRealtimeProvider,
        TypeormDatasourceProvider,
    ]
})
export class ApiModule { }

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

// Khởi tạo backend
const app = await NestFactory.create(ApiModule)
app.useWebSocketAdapter(new WsAdapter(app) as any)
app.enableCors()
app.use(BodyParser.json({ limit: "100mb" }))
const PORT = Number(process.env.API_PORT || 80)
await app.listen(PORT)
console.log(`Server is listening on ${PORT}`)