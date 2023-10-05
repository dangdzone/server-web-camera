
import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { ObjectId } from "mongodb"

@Entity('orders') // Đơn hàng
export class Order extends BaseEntity {

    @Column()
    customer_id: string = new ObjectId().toString() // Id khách hàng

    @Column()
    restaurant_id: string // Id nhà hàng

    @Column()
    create_name: string = 'Khách hàng' // Người tạo 

    @Column()
    table_id: string // ID bàn đang sử dụng

    @Column()
    status: string = 'unpaid' // Trạng thái đơn hàng 

    @Column()
    total: number = 0 // Tổng tiền

}
