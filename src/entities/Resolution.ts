import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('resolutions') // Độ phân giải
export class Resolution extends BaseEntity {
    
    @Column()
    name: string // Tên

    @Column()
    size: string // Kích thước

    @Column()
    note: string // Ghi chú
}