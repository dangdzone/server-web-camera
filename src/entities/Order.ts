import { Column, Entity } from "typeorm"
import { BaseEntity } from "./BaseEntity.js"

@Entity('orders') // Đơn hàng
export class Order extends BaseEntity {

    @Column()
    name: string // Tên danh mục

    @Column()
    status: string // Trạng thái

    @Column()
    image: string

    @Column()
    order_item: Array<{
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
    transport_fee: number // Phí vận chuyển

    @Column()
    customer_id: string // Thông tin khách hàng

    @Column()
    receiver_info: {
        receiver_name: string // Tên người nhận
        receiver_phone: number // sdt người nhận
        province: number // Tỉnh
        district: number // huyện
        ward: number // Phường, xã
        street: number // Số nhà, tên đường
        note: string // ghi chú
    }
}