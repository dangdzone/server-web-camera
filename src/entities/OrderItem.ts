import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('order-items') // Món trong đơn hàng
export class OrderItem extends BaseEntity {

    @Column()
    restaurant_id: string // Id nhà hàng 

    @Column()
    name: string // Tên món

    @Column()
    price: number // Giá bán

    @Column()
    table_id: string // id bàn

    @Column()
    creator_id: string // ID Người tạo

    @Column()
    creator_name: string // Tên Người tạo

    @Column()
    food_id: string // ID món

    @Column()
    amount: number // Số lượng

    @Column()
    image: string // Ảnh món

    @Column()
    order_id: string // ID đơn hàng

    @Column()
    customer_id: string // ID khách hàng

    @Column()
    status: string = 'requested' // Trạng thái món

    @Column()
    description: string
}