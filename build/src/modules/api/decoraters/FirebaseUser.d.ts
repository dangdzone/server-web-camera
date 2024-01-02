import { UserInfo } from "firebase-admin/auth";
export type FirebaseUser = UserInfo & {
    $: any;
};
export declare const FirebaseUser: (...dataOrPipes: (string | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
