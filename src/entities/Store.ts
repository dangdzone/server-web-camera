import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('stores') // Danh mục camera
export class Store extends BaseEntity {
    
    @Column()
    name: string // Tên danh mục

    @Column()
    image: string // Ảnh

    @Column()
    store_list: Array<Object> // Danh sách cửa hàng

}