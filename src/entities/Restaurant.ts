import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('restaurants') // Nhà hàng
export class Restaurant extends BaseEntity {

    @Column()
    name: string // Tên cửa hàng

    @Column()
    address: string // Địa chỉ cửa hàng

    @Column()
    phone: string // Số điện thoại cửa hàng 

    @Column()
    status: string = 'active' // Trạng thái hoạt động 

}