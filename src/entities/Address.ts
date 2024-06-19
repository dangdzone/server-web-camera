import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('addresses') // Giỏ hàng
export class Address extends BaseEntity {

    @Column()
    customer_id: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    province: number | string // Tỉnh

    @Column()
    district: number // huyện

    @Column()
    ward: number | string // Phường, xã

    @Column()
    street: number | string // Số nhà, tên đường

    @Column()
    default: boolean // mặc định
    
}