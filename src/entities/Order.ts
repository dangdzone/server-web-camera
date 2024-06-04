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