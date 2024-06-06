import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('stores') // Danh mục camera
export class Store extends BaseEntity {

    @Column()
    name: string // Tên danh mục

    @Column()
    province: number | string // Tỉnh

    @Column()
    district: number | string// huyện

    @Column()
    ward: number | string // Phường, xã

    @Column()
    street: number | string // Số nhà, tên đường

    @Column()
    link_map: string // google map

}