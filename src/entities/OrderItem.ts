import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity('order-items') // Món trong đơn hàng
export class OrderItem extends BaseEntity {

    @Column()
    restaurant_id: string // Id nhà hàng 

    @Column()
    table_id: string // id bàn

    @Column()
    create_name: string // người tạo

    @Column()
    food_id: string // ID món

}