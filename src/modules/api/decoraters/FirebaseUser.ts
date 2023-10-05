// Lấy user từ request của người dùng
import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserInfo } from "firebase-admin/lib/auth/user-record"

export type FirebaseUser = UserInfo & { $: any }
export const FirebaseUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        if (request) {
            const user = request.user
            return data ? user && user[data] : user
        }
        return ctx.switchToHttp().getRequest().user
    },
)