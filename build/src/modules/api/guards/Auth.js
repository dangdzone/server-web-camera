var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WhoCanDoThatGuard_1;
import { Injectable, SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import firebase from 'firebase-admin';
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        try {
            const authorization = req.headers.authorization;
            if (authorization) {
                const user = await firebase.auth().verifyIdToken(authorization);
                req.user = user;
                return true;
            }
            return true;
        }
        catch (e) {
            console.error(e);
        }
        return true;
    }
};
AuthGuard = __decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
let WhoCanDoThatGuard = WhoCanDoThatGuard_1 = class WhoCanDoThatGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const allow_conditions = this.reflector.get(WhoCanDoThatGuard_1, context.getHandler());
        const req = context.switchToHttp().getRequest();
        for (const condition of allow_conditions) {
            try {
                if (await condition(Object.assign(this, { req })))
                    return true;
            }
            catch (e) {
                console.error(e);
            }
        }
        return false;
    }
};
WhoCanDoThatGuard = WhoCanDoThatGuard_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], WhoCanDoThatGuard);
export { WhoCanDoThatGuard };
export const WhoCanDoThat = (...allow_conditions) => applyDecorators(UseGuards(AuthGuard, WhoCanDoThatGuard), SetMetadata(WhoCanDoThatGuard, allow_conditions));
export const Or = (...conditions) => async (ctx) => {
    for (const condition of conditions) {
        try {
            if (await condition(ctx))
                return true;
        }
        catch (e) {
            return false;
        }
    }
    return false;
};
export const CheckParam = (param, permissions) => async (ctx) => {
    const param_value = ctx.req.params[param];
    if (!param_value)
        return false;
    for (const [value, checker] of Object.entries(permissions)) {
        if (value == param_value) {
            return await checker(ctx);
        }
    }
    return false;
};
export const Logged = ctx => {
    return !!ctx.req.user;
};
export const Owner = ctx => {
    return ctx.req.user?.uid == ctx.req.params.id || ctx.req.user?.uid == ctx.req.params.staff_id || ctx.req.user?.uid == ctx.req.params.owner_id;
};
export const StoreOwner = ctx => {
    return ctx.req.user?.$?.[ctx.req.params.restaurant_id]?.includes('owner') || ctx.req.user?.$?.[ctx.req.params.id]?.includes('owner');
};
export const StoreManager = ctx => {
    return ctx.req.user?.$?.[ctx.req.params.restaurant_id]?.includes('manager') || ctx.req.user?.$?.[ctx.req.params.id]?.includes('manager');
};
export const RestaurantStaff = Or(Logged, Owner, StoreOwner, StoreManager);
//# sourceMappingURL=Auth.js.map