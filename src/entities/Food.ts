import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity"

@Entity('foods') // Món ăn
export class Food extends BaseEntity {

    @Column()
    name: string // Tên món 

    @Column()
    restaurant_id: string // Id nhà hàng 

    @Column()
    category_id: string // Id danh mục món

    @Column()
    images: string // Ảnh

    @Column()
    menu_id: string // Menu

    @Column()
    description: string // Miêu tả

    @Column()
    price: number // Giá bán

}