import { Column, ObjectIdColumn } from "typeorm"

export type PermissionList = string

export type UserPermissions = {
    [user_uid: string]: PermissionList
}

export class BaseEntity {

    constructor() { // Thời gian tạo
        this.created_at = Date.now()
    }

    @ObjectIdColumn({ name: '_id' }) // id tạo
    id: string

    @Column()
    created_at: number // Thời gian tạo

    @Column()
    updated_at: number // Cập nhật

    @Column({ nullable: true })
    permissions: {
        [permission: string]: string // Tất cả quyền  
    }
}