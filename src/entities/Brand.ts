import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('brands') // Thương hiệu
export class Brand extends BaseEntity {
    
    @Column()
    name: string // Tên thương hiệu

    @Column()
    image: string // Ảnh

}