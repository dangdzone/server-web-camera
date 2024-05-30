import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import firebase from 'firebase-admin';
import { Request } from 'express';
export type Req = Request & {
    user?: firebase.auth.UserInfo & {
        [key: string]: any;
    };
};
type AuthContext = {
    req: Req;
};
type AllowCondition = (ctx: AuthContext) => Promise<boolean> | boolean;
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class WhoCanDoThatGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const WhoCanDoThat: (...allow_conditions: AllowCondition[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const Or: (...conditions: AllowCondition[]) => (ctx: AuthContext) => Promise<boolean>;
export declare const CheckParam: (param: string, permissions: {
    [value: string]: AllowCondition;
}) => (ctx: AuthContext) => Promise<boolean>;
export declare const Logged: AllowCondition;
export declare const Owner: AllowCondition;
export declare const RestaurantStaff: AllowCondition;
export {};
