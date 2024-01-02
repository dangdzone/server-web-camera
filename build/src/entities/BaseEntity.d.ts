export type PermissionList = string;
export type UserPermissions = {
    [user_uid: string]: PermissionList;
};
export declare class BaseEntity {
    constructor();
    id: string;
    created_at: number;
    updated_at: number;
    owner_id: string;
    permissions: {
        [permission: string]: string;
    };
}
