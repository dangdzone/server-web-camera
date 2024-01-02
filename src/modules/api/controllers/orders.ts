
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseTypeormDatasource } from '../decoraters/UseTypeormDatasource.js';
import { Order } from '../../../entities/Order.js';


@Controller('livequery/restaurants/:restaurant_id') // Món ăn
export class OrderController {

    // Hàm khởi tạo, tạo các biến để thao tác với DB
    constructor(
        @InjectRepository(Order) private OrderCollection: Repository<Order>
    ) {
    }

    @Get(['orders', 'orders/:id'])
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async list() { }

    @Post('orders')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async create() { }

    @Patch('orders/:id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async patch(
        @Body('status') status: string,
        @Param('restaurant_id') restaurant_id: string,
    ) {
        // status == 'paid' && this.ReportService.generate_restaurant_orders_report(restaurant_id)
        
    }

    @Get(['tables/:table_id/orders', 'tables/:table_id/orders/:id']) // Lấy đơn hàng theo bàn
    async list_orders_by_tables( // Lấy đơn hàng theo bàn
        @Param('restaurant_id') restaurant_id: string,
        @Param('table_id') table_id: string
    ) {
        
        const orders = await this.OrderCollection.find(
            { where: { table_id } }
        )

        return {
            data: {
                items: orders.map((order) => {
                    return {
                        ...order,
                        id: order.id.toString()
                    }
                })
            }
        }
    }

    @Delete(':id')
    @UseTypeormDatasource({ entity: Order, realtime: true })
    async del() { }

}