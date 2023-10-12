
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { OrderItem } from '../../../entities/OrderItem.js';
import { Food } from '../../../entities/Food.js';
import { Order } from '../../../entities/Order.js';
import { ObjectId } from 'mongodb';


@Controller('livequery/restaurants/:restaurant_id/orders/:order_id/order-items') // Món ăn
export class OrderItemController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(OrderItem) private OrderItemCollection: MongoRepository<OrderItem>,
        @InjectRepository(Food) private FoodCollection: MongoRepository<Food>,
        @InjectRepository(Order) private OrderCollection: MongoRepository<Order>,
    ) {
    }

    @Get(['', ':id'])
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async list() { }

    @Post()
    async post(
        @Body() body: OrderItem, // Thông tin món khách hàng yêu cầu
        @Param('order_id') order_id: string
    ) {

        // Lấy thông tin của món ăn từ CSDL === id món khách hàng
        const food = await this.FoodCollection.findOne(
            { where: { _id: new ObjectId(body.id) } }
        )

        // Check xem món đó còn trong CSDL không
        if (!food) { throw { code: 'FOOD_NOT_FOUND' } }

        // Lấy thông tin của đơn hàng trong CSDL
        const order_info = await this.OrderCollection.findOne(
            { where: { _id: new ObjectId(order_id) } }
        )

        // Chek bàn có còn trong CSDL không
        if (!order_info) { throw { code: 'ORDER_NOT_FOUND' } }

        // Lưu thông tin món vào Order-Item
        const created_order_item = await this.OrderItemCollection.save({
            ...new OrderItem(),
            ...body,
            price: food.price,
            order_id,
            food_id: food.id,
            restaurant_id: food.restaurant_id
        } as OrderItem)

        // Update đơn hàng 
        await this.OrderCollection.updateMany(
            { _id: new ObjectId(order_id) },
            {
                $inc: {
                    total: food.price * body.amount
                }
            }
        )

        return {
            data: {
                item: created_order_item
            }
        }
    }

    @Patch(':id')
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async patch() { }

    @Delete(':id')
    @UseTypeormDatasource({ entity: OrderItem, realtime: true })
    async del() { }

}