
import { Column, Entity } from "typeorm"
import { ObjectId } from "mongodb"
import { BaseEntity } from "./BaseEntity.js"

@Entity('orders') // Đơn hàng
export class Order extends BaseEntity {

    @Column()
    customer_id: string = new ObjectId().toString() // Id khách hàng

    @Column()
    restaurant_id: string // Id nhà hàng

    @Column()
    customer_name: string = 'Khách hàng' // Người tạo 

    @Column()
    table_id: string // ID bàn đang sử dụng

    @Column()
    status: string = 'unpaid' // Trạng thái đơn hàng 

    @Column()
    total: number = 0 // Tổng tiền

    @Column()
    food_amount: number = 0 // Số lượng món
}
