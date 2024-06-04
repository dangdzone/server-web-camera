
import { CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import firebase from 'firebase-admin'
import { Request } from 'express'

export type Req = Request & { user?: firebase.auth.UserInfo & { [key: string]: any } }

type AuthContext = {
    req: Req
}

// ctx đại diện cho request (chứa thông tin người dùng)
type AllowCondition = (ctx: AuthContext) => Promise<boolean> | boolean

// Class của framework Nestjs
@Injectable()
export class AuthGuard implements CanActivate {

    // Lấy thông tin user
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        try {
            // Check authorization
            const authorization = req.headers.authorization
            if (authorization) {
                const user = await firebase.auth().verifyIdToken(authorization)
                req.user = user
                return true
            }
            return true
        } catch (e) {
            console.error(e)
        }
        return true
    }
}

// Class để phân quyền
@Injectable()
export class WhoCanDoThatGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    // Hàm check xem người dùng có được truy cập vào đường dẫn hay không (trả về true thì được phép, false thì bị chặn)
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const allow_conditions = this.reflector.get<AllowCondition[]>(WhoCanDoThatGuard, context.getHandler())
        const req = context.switchToHttp().getRequest()
        for (const condition of allow_conditions) {
            try {
                if (await condition(Object.assign(this, { req }))) return true
            } catch (e) {
                console.error(e)
            }
        }
        return false
    }

}


// Decorator để dùng kèm với http method cấu hình cho phép ai được quyền truy cập vào đường dẫn tương ứng
export const WhoCanDoThat = (...allow_conditions: AllowCondition[]) => applyDecorators(
    UseGuards(AuthGuard, WhoCanDoThatGuard),
    SetMetadata(WhoCanDoThatGuard, allow_conditions)
)

// Or là thỏa mãn 1 trong các điều kiện thì trả về true => được phép truy cập
export const Or = (...conditions: AllowCondition[]) => async (ctx: AuthContext) => {
    for (const condition of conditions) {
        try {
            if (await condition(ctx)) return true
        } catch (e) {
            return false
        }
    }
    return false
}

// Phân quyền theo http param (dùng cho phần báo cáo)
export const CheckParam = (param: string, permissions: {
    [value: string]: AllowCondition
}) => async (ctx: AuthContext) => {
    const param_value = ctx.req.params[param]
    if (!param_value) return false
    for (const [value, checker] of Object.entries(permissions)) {
        if (value == param_value) {
            return await checker(ctx)
        }
    }
    return false
}

// Đã đăng nhập
export const Logged: AllowCondition = ctx => {
    return !!ctx.req.user
}

// Chủ của tài nguyên / thực thể tương ứng (VD: người tạo đơn hàng)
export const Owner: AllowCondition = ctx => {
    return ctx.req.user?.uid == ctx.req.params.id || ctx.req.user?.uid == ctx.req.params.owner_id // Chi tiết thông tin của người đó
}

export const RestaurantStaff: AllowCondition = Or(
    Logged,
    Owner,
)