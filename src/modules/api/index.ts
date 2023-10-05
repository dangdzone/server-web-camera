import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { LivequeryInterceptor, LivequeryWebsocketSync } from '@livequery/nestjs';
import { TypeormDatasource } from '@livequery/typeorm';
import { MongodbRealtimeMapperProvider } from '@livequery/mongodb-mapper';
import { WsAdapter } from '@nestjs/platform-ws'
import BodyParser from "body-parser";
import admin from "firebase-admin"
import { MongoConnectionInfo, TypeormConfigModule } from "src/config/TypeormConfigModule";

@Module({
    imports: [TypeormConfigModule],
    controllers: [
        // AreaController,
        // CategoryController,
        // NotificationController,
        // FoodRestaurantController,
        // OrderItemController,
        // OrderController,
        // ReportController,
        // OrderItemManagerController,
        // RestaurantController,
        // TableController,
        // ServingAreaController,
        // StaffController,
    ],
    providers: [
        LivequeryInterceptor,
        LivequeryWebsocketSync,
        TypeormDatasource,
        MongodbRealtimeMapperProvider([MongoConnectionInfo])
    ]
})
export class ApiModule { }

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

// Khởi tạo backend
const app = await NestFactory.create(ApiModule)
app.useWebSocketAdapter(new WsAdapter(app));
app.enableCors()
app.use(BodyParser.json({ limit: "100mb" }))
const PORT = Number(process.env.API_PORT || 80)
await app.listen(PORT)
console.log(`Server is listening on ${PORT}`)