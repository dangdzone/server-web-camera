import { createParamDecorator } from "@nestjs/common";
export const FirebaseUser = createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (request) {
        const user = request.user;
        return data ? user && user[data] : user;
    }
    return ctx.switchToHttp().getRequest().user;
});
//# sourceMappingURL=FirebaseUser.js.map