import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity('tables') // Bàn ăn
export class RestaurantTable extends BaseEntity {

    @Column( )
    name: string // Tên bàn

    @Column()
    order_ids: string[] = [] // Các đơn hàng

    @Column()
    status: string // Trạng thái bàn

    @Column()
    menu_id: string // Menu

}