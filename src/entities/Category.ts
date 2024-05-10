import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('categories') // Danh mục camera
export class Category extends BaseEntity {
    
    @Column()
    name: string // Tên danh mục

    @Column()
    image: string // Ảnh

    @Column()
    href: string // Đường dẫn

}