
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Restaurant } from '../../../entities/Restaurant.js';
import { Logged, Owner, RestaurantOwner, WhoCanDoThat } from '../guards/Auth.js';
import { LivequeryResponse } from '@livequery/nestjs';
import { FirebaseUser } from '../decoraters/FirebaseUser.js';
import { ObjectId } from 'mongodb';
import Firebase from "firebase-admin"
import { Category } from '../../../entities/Category.js';
import { RestaurantTable } from '../../../entities/RestaurantTable.js';


@Controller('livequery') // Món ăn
export class RestaurantController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Restaurant) private RestaurantCollection: MongoRepository<Restaurant>,
        @InjectRepository(Category) private $Category: MongoRepository<Category>,
        @InjectRepository(RestaurantTable) private $Table: MongoRepository<RestaurantTable>,
    ) { }

    @Get('restaurants/:id') // Lấy 1 nhà hàng
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async get() {
    }

    @Get('owners/:owner_id/restaurants') // Lấy danh sách nhà hàng mình làm chủ
    @WhoCanDoThat(Owner)
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async list() {
    }

    @Post('owners/:owner_id/restaurants')
    @WhoCanDoThat(Logged)
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async create(
        @LivequeryResponse() res: { item: { id: ObjectId } }, // res: Nhà hàng vừa tạo
        @FirebaseUser() user: FirebaseUser
    ) {
        // Lấy id nhà hàng vừa tạo
        const restaurant_id = res.item.id.toString()

        // Chuyển quyền cho firebase
        await Firebase.auth().setCustomUserClaims(user.uid, {
            $: {
                ...user.$,
                [restaurant_id]: 'owner',
            }
        })

        // Khi tạo nhà hàng mặc định sẽ tạo category
        await this.$Category.save({
            ...new Category(),
            restaurant_id,
            name: 'Món khai vị',
        })

        // Khi tạo nhà hàng mặc định sẽ tạo table
        await this.$Table.save({
            ...new RestaurantTable(),
            restaurant_id,
            name: 'Bàn A1',
        })
    }

    // Sửa thông tin nhà hàng khi là chủ nhà hàng
    @Patch('restaurants/:id')
    @WhoCanDoThat(RestaurantOwner)
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async patch() { }


    @Delete('restaurants/:id/~close')
    @UseTypeormDatasource({ entity: Restaurant, realtime: true })
    async del() { }

}