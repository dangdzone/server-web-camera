import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('brands') // Danh mục camera
export class Brand extends BaseEntity {
    
    @Column()
    name: string // Tên danh mục

    @Column()
    image: string // Ảnh

}