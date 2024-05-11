import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('products') // Danh mục camera
export class Product extends BaseEntity {
    
    @Column()
    name: string // Tên

    @Column()
    image: string // Ảnh

    @Column()
    cost: number // Giá nhập 

    @Column()
    price: number // Giá bán

    @Column()
    advertising_price: number // Giá quảng cáo

    @Column()
    brand_id: string // Thương hiệu

    @Column()
    code: string // Mã sản phẩm

    @Column()
    description: string // Ghi chú

    @Column()
    resolution_id: string // độ phân giải 

    @Column()
    amount: number // số lượng

    @Column()
    specifications: Array<Object> // Thông số kĩ thuật

    @Column()
    category_id: string // Danh mục sản phẩm

    @Column()
    option: Array<Object> // Tùy chọn thêm

}