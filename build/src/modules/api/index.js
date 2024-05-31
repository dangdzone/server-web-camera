var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WsAdapter } from '@nestjs/platform-ws';
import BodyParser from "body-parser";
import admin from "firebase-admin";
import { LivequeryInterceptor, LivequeryWebsocketSync } from "@livequery/nestjs";
import { MongoDBRealtimeProvider, TypeormDatasourceProvider } from "./decoraters/UseTypeormDatasource.js";
import { CategoryController } from "./controllers/categories.js";
import { TypeormConfigModule } from "../../config/TypeormConfigModule.js";
import { ResolutionController } from "./controllers/resolutions.js";
import { BrandController } from "./controllers/brands.js";
import { ProductController } from "./controllers/products.js";
import { StoreController } from "./controllers/stores.js";
import { CartController } from "./controllers/carts.js";
import { OrderController } from "./controllers/orders.js";
import { MomoController } from "./controllers/payments.js";
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    Module({
        imports: [TypeormConfigModule],
        controllers: [
            CategoryController,
            ResolutionController,
            BrandController,
            ProductController,
            StoreController,
            CartController,
            OrderController,
            MomoController
        ],
        providers: [
            LivequeryInterceptor,
            LivequeryWebsocketSync,
            MongoDBRealtimeProvider,
            TypeormDatasourceProvider,
        ]
    })
], ApiModule);
export { ApiModule };
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
const app = await NestFactory.create(ApiModule);
app.useWebSocketAdapter(new WsAdapter(app));
app.enableCors();
app.use(BodyParser.json({ limit: "100mb" }));
const PORT = Number(process.env.API_PORT || 80);
await app.listen(PORT);
console.log(`Server is listening on ${PORT}`);
//# sourceMappingURL=index.js.map