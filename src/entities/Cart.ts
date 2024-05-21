import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('carts') // Giỏ hàng
export class Cart extends BaseEntity {

    @Column()
    product_list: Array<{
        product_id: string // ID sản phẩm
        amount: number
        price: number
        select: boolean
    }>

}