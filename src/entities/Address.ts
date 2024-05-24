import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('address') // Danh mục camera
export class Address extends BaseEntity {
    
    @Column()
    order_id: string // id đơn hàng

    @Column()
    receiver_name: string // Tên người nhận

    @Column()
    receiver_phone: number // sdt người nhận

    @Column()
    province: string // Tỉnh

    @Column()
    district: string // huyện

    @Column()
    ward: string // Phường, xã

    @Column()
    street: string // Số nhà, tên đường

    @Column()
    note: string // ghi chú

}