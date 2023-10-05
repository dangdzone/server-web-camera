import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity('categories') // Danh mục món ăn
export class Category extends BaseEntity {

    @Column()
    restaurant_id: string // Id nhà hàng

    @Column()
    menu_id: string // Menu

    @Column()
    name: string // Tên danh mục món 

}