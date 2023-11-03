import React, { Component } from 'react';

class VnPayPayment extends Component {
    createPayment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/vnpay_create_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 100000, // Example amount
                    orderDescription: 'Order description', // Example order description
                    orderType: 'payment', // Example order type
                    language: 'vn', // Example language
                    bankCode: 'SCB',
                    // ... other parameters
                }),
            });

            const responseData = await response.json();

            if (responseData.paymentUrl) {
                window.location.href = responseData.paymentUrl;
            } else {
                console.error('Invalid response from VNPAY:', responseData);
            }
        } catch (error) {
            console.error('Error creating VNPAY payment:', error);
        }
    };

    render() {
        return (
            <div>
                <h1>VNPAY Payment Example</h1>
                <div className="container">
                    <div className="header clearfix">
                        <h3 className="text-muted">VNPAY DEMO</h3>
                    </div>
                    <h3>Tạo mới đơn hàng</h3>
                    <div className="table-responsive">
                        <form id="create_form" method="post">
                            <div className="form-group">
                                <label htmlFor="order_type">Loại hàng hóa</label>
                                <select className="form-control" id="order_type" name="order_type">
                                    <option value="topup">Nạp tiền điện thoại</option>
                                    <option value="billpayment">Thanh toán hóa đơn</option>
                                    <option value="fashion">Thời trang</option>
                                    <option value="other">Khác - Xem thêm tại VNPAY</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="order_id">Mã hóa đơn</label>
                                <input
                                    className="form-control"
                                    id="order_id"
                                    name="order_id"
                                    type="text"
                                    value={new Date().toISOString()}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Số tiền</label>
                                <input className="form-control" id="amount" name="amount" type="number" value="10000" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="order_desc">Nội dung thanh toán</label>
                                <textarea className="form-control" id="order_desc" name="order_desc" rows="2">
                                    Noi dung thanh toan
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bank_code">Ngân hàng</label>
                                <select className="form-control" id="bank_code" name="bank_code">
                                    <option value="">Không chọn</option>
                                    <option value="NCB"> Ngan hang NCB</option>
                                    <option value="AGRIBANK"> Ngan hang Agribank</option>
                                    <option value="SCB"> Ngan hang SCB</option>
                                    <option value="SACOMBANK">Ngan hang SacomBank</option>
                                    <option value="EXIMBANK"> Ngan hang EximBank</option>
                                    <option value="MSBANK"> Ngan hang MSBANK</option>
                                    <option value="NAMABANK"> Ngan hang NamABank</option>
                                    <option value="VNMART"> Vi dien tu VnMart</option>
                                    <option value="VIETINBANK">Ngan hang Vietinbank</option>
                                    <option value="VIETCOMBANK"> Ngan hang VCB</option>
                                    <option value="HDBANK">Ngan hang HDBank</option>
                                    <option value="DONGABANK"> Ngan hang Dong A</option>
                                    <option value="TPBANK"> Ngân hàng TPBank</option>
                                    <option value="OJB"> Ngân hàng OceanBank</option>
                                    <option value="BIDV"> Ngân hàng BIDV</option>
                                    <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
                                    <option value="VPBANK"> Ngan hang VPBank</option>
                                    <option value="MBBANK"> Ngan hang MBBank</option>
                                    <option value="ACB"> Ngan hang ACB</option>
                                    <option value="OCB"> Ngan hang OCB</option>
                                    <option value="IVB"> Ngan hang IVB</option>
                                    <option value="VISA"> Thanh toan qua VISA/MASTER</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="language">Ngôn ngữ</label>
                                <select className="form-control" id="language" name="language">
                                    <option value="vn">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="language">Ngôn ngữ</label>
                                <select name="language" id="language" class="form-control">
                                    <option value="vn">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Thời hạn thanh toán</label>
                                <input
                                    class="form-control"
                                    id="txtexpire"
                                    name="txtexpire"
                                    type="text"
                                    value="<?php echo $expire; ?>"
                                />
                            </div>
                            <div class="form-group">
                                <h3>Thông tin hóa đơn (Billing)</h3>
                            </div>
                            <div class="form-group">
                                <label>Họ tên (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_billing_fullname"
                                    name="txt_billing_fullname"
                                    type="text"
                                    value="NGUYEN VAN XO"
                                />
                            </div>
                            <div class="form-group">
                                <label>Email (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_billing_email"
                                    name="txt_billing_email"
                                    type="text"
                                    value="xonv@vnpay.vn"
                                />
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_billing_mobile"
                                    name="txt_billing_mobile"
                                    type="text"
                                    value="0934998386"
                                />
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_billing_addr1"
                                    name="txt_billing_addr1"
                                    type="text"
                                    value="22 Lang Ha"
                                />
                            </div>
                            <div class="form-group">
                                <label>Mã bưu điện (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_postalcode"
                                    name="txt_postalcode"
                                    type="text"
                                    value="100000"
                                />
                            </div>
                            <div class="form-group">
                                <label>Tỉnh/TP (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_bill_city"
                                    name="txt_bill_city"
                                    type="text"
                                    value="Hà Nội"
                                />
                            </div>
                            <div class="form-group">
                                <label>Bang (Áp dụng cho US,CA)</label>
                                <input
                                    class="form-control"
                                    id="txt_bill_state"
                                    name="txt_bill_state"
                                    type="text"
                                    value=""
                                />
                            </div>
                            <div class="form-group">
                                <label>Quốc gia (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_bill_country"
                                    name="txt_bill_country"
                                    type="text"
                                    value="VN"
                                />
                            </div>
                            <div class="form-group">
                                <h3>Thông tin giao hàng (Shipping)</h3>
                            </div>
                            <div class="form-group">
                                <label>Họ tên (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_fullname"
                                    name="txt_ship_fullname"
                                    type="text"
                                    value="Nguyễn Thế Vinh"
                                />
                            </div>
                            <div class="form-group">
                                <label>Email (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_email"
                                    name="txt_ship_email"
                                    type="text"
                                    value="vinhnt@vnpay.vn"
                                />
                            </div>
                            <div class="form-group">
                                <label>Số điện thoại (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_mobile"
                                    name="txt_ship_mobile"
                                    type="text"
                                    value="0123456789"
                                />
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_addr1"
                                    name="txt_ship_addr1"
                                    type="text"
                                    value="Phòng 315, Công ty VNPAY, Tòa nhà TĐL, 22 Láng Hạ, Đống Đa, Hà Nội"
                                />
                            </div>
                            <div class="form-group">
                                <label>Mã bưu điện (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_postalcode"
                                    name="txt_ship_postalcode"
                                    type="text"
                                    value="1000000"
                                />
                            </div>
                            <div class="form-group">
                                <label>Tỉnh/TP (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_city"
                                    name="txt_ship_city"
                                    type="text"
                                    value="Hà Nội"
                                />
                            </div>
                            <div class="form-group">
                                <label>Bang (Áp dụng cho US,CA)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_state"
                                    name="txt_ship_state"
                                    type="text"
                                    value=""
                                />
                            </div>
                            <div class="form-group">
                                <label>Quốc gia (*)</label>
                                <input
                                    class="form-control"
                                    id="txt_ship_country"
                                    name="txt_ship_country"
                                    type="text"
                                    value="VN"
                                />
                            </div>
                            <div class="form-group">
                                <h3>Thông tin gửi Hóa đơn điện tử (Invoice)</h3>
                            </div>
                            <div class="form-group">
                                <label>Tên khách hàng</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_customer"
                                    name="txt_inv_customer"
                                    type="text"
                                    value="Lê Văn Phổ"
                                />
                            </div>
                            <div class="form-group">
                                <label>Công ty</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_company"
                                    name="txt_inv_company"
                                    type="text"
                                    value="Công ty Cổ phần giải pháp Thanh toán Việt Nam"
                                />
                            </div>
                            <div class="form-group">
                                <label>Địa chỉ</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_addr1"
                                    name="txt_inv_addr1"
                                    type="text"
                                    value="22 Láng Hạ, Phường Láng Hạ, Quận Đống Đa, TP Hà Nội"
                                />
                            </div>
                            <div class="form-group">
                                <label>Mã số thuế</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_taxcode"
                                    name="txt_inv_taxcode"
                                    type="text"
                                    value="0102182292"
                                />
                            </div>
                            <div class="form-group">
                                <label>Loại hóa đơn</label>
                                <select name="cbo_inv_type" id="cbo_inv_type" class="form-control">
                                    <option value="I">Cá Nhân</option>
                                    <option value="O">Công ty/Tổ chức</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_email"
                                    name="txt_inv_email"
                                    type="text"
                                    value="pholv@vnpay.vn"
                                />
                            </div>
                            <div class="form-group">
                                <label>Điện thoại</label>
                                <input
                                    class="form-control"
                                    id="txt_inv_mobile"
                                    name="txt_inv_mobile"
                                    type="text"
                                    value="02437764668"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" id="btnPopup">
                                Thanh toán Post
                            </button>
                            <button type="submit" name="redirect" id="redirect" className="btn btn-default">
                                Thanh toán Redirect
                            </button>
                        </form>
                    </div>
                </div>
                <button onClick={this.createPayment}>Create Payment</button>
            </div>
        );
    }
}

export default VnPayPayment;
