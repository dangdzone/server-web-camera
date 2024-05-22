import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('carts') // Giỏ hàng
export class Cart extends BaseEntity {

    @Column()
    product_id: string

    @Column()
    amount: number

    @Column({ default: false })
    select: boolean

}