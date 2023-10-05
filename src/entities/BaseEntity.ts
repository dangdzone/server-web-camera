import { Column, ObjectIdColumn } from "typeorm"

export class BaseEntity {

    constructor() { // 
        this.created_at = Date.now()
    }

    id: string

    @ObjectIdColumn() // decorator
    _id: string

    @Column()
    created_at: number // Thời gian tạo

    @Column()
    updated_at: number // Cập nhật

    @Column({ nullable: true })
    owner_id: string // id Chủ chuỗi cửa hàng 

    @Column({ nullable: true })
    permissions: {
        [permission: string]: string // Tất cả quyền  
    }
}