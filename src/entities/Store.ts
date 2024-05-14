import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('stores') // Danh mục camera
export class Store extends BaseEntity {
    
    @Column()
    name: string // Tên danh mục

    @Column()
    address: string // Địa chỉ

    @Column()
    link_map: string // google map

}