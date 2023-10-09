import { Column, ObjectIdColumn } from "typeorm"

export type PermissionList = string

export type UserPermissions = {
    [user_uid: string]: PermissionList
}

export class BaseEntity {

    @ObjectIdColumn({ name: '_id' })
    id: string

    @Column()
    created_at: number // Thời gian tạo

    @Column()
    updated_at?: number = Date.now() // Cập nhật

    @Column({ nullable: true })
    owner_id: string // id Chủ chuỗi cửa hàng 

    @Column({ nullable: true })
    permissions: {
        [permission: string]: string // Tất cả quyền  
    }
}