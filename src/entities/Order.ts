import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('orders') // Đơn hàng
export class Order extends BaseEntity {

    @Column()
    code: string // Mã đơn hàng

    @Column()
    status: string // Trạng thái

    @Column() // Danh sách sản phẩm của đơn hàng đấy
    order_items: Array<{
        product_id: string
        amount: number
        select: boolean
    }>

    @Column()
    amount: number // Số lượng

    @Column()
    total: number // Tổng tiền

    @Column()
    discount: number // Giảm giá

    @Column()
    pay: number // Tiền thanh toán

    @Column()
    shipping_fee: number // Phí vận chuyển

    @Column()
    customer_id: string // Thông tin khách hàng
    
    @Column()
    customer_info: { // Thông tin khách hàng tạo
        name: string,
        email: string,
        img: string
    }

    @Column()
    address_id: string // Thông tin giao hàng

    @Column()
    note: string // ghi chú
}