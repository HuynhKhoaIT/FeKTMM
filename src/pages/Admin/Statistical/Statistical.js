import React from 'react';
import styles from './Statistical.module.scss';
import classNames from 'classnames/bind';
import SidebarAdmin from '../../../Layout/components/SidebarAdmin';
import SidebarAdminMobi from '../../../Layout/components/SidebarAdmin/SidebarAdminMobi';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
const cx = classNames.bind(styles);
function Statistical() {
    const [tagCurrent, setTagcurrent] = useState(1);
    const [datamoney, setDatarmoney] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 12648000, 212648000, 1836000]);
    const [datauser, setDatausser] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 6]);
    const [dataorder, setDataoder] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 18]);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Doanh thu',
                data: datamoney,
                fill: true,
                borderColor: 'rgb(255, 0, 0)',
            },
        ],
    };
    const tableuser = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Người dùng mới',
                data: datauser,
                fill: true,
                borderColor: 'rgb(255, 0, 0)',
            },
        ],
    };
    const tableorder = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Đơn hàng',
                data: dataorder,
                fill: true,
                borderColor: 'rgb(255, 0, 0)',
            },
        ],
    };
    const caculator = (data) => {
        const sum = data.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);
        return sum;
    };
    return (
        <div className={cx('container-fluid')}>
            <div className={cx('row')}>
                <div className={cx('col-lg-3 col-xl-2 d-none d-xl-block', 'sidebar-wrapper')}>
                    <SidebarAdmin />
                </div>
                <div className={cx('d-block d-xl-none', 'sidebar-mobi-wrapper')}>
                    <SidebarAdminMobi />
                </div>
                <div className={cx('col-12 col-lg-12 col-xl-10 container-fluid', 'content-section')}>
                    <div className={cx('d-flex align-items-center ', 'title')}>Thống kê</div>
                    <div className={cx('wrapper')}>
                        <div className={cx('content')}>
                            <div className={cx('container-fluid')}>
                                <div className={cx('d-flex justify-content-center', 'filter')}>
                                    <div class="btn-group btn-group-lg">
                                        {tagCurrent === 1 ? (
                                            <button type="button" class="btn btn-light btn-outline-dark active">
                                                Doanh thu
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setTagcurrent(1)}
                                                type="button"
                                                class="btn btn-light btn-outline-dark"
                                            >
                                                Doanh thu
                                            </button>
                                        )}
                                        {tagCurrent === 2 ? (
                                            <button type="button" class="btn btn-light btn-outline-dark active">
                                                Người dùng mới
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setTagcurrent(2)}
                                                type="button"
                                                class="btn btn-light btn-outline-dark"
                                            >
                                                Người dùng mới
                                            </button>
                                        )}
                                        {tagCurrent === 3 ? (
                                            <button type="button" class="btn btn-light btn-outline-dark active">
                                                Đơn hàng
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setTagcurrent(3)}
                                                type="button"
                                                class="btn btn-light btn-outline-dark"
                                            >
                                                Đơn hàng
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className={cx('filter-time')}>
                                    {/* <select>
                                        <option value="option1">Theo tháng</option>
                                        <option value="option2">Theo năm</option>
                                    </select> */}
                                </div>
                                <div className={cx('row', 'statistical')}>
                                    <div className={cx('row', 'statistics')}>
                                        <div className={cx('col-12 col-lg-6 col-md-6')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-4 col-lg-4 col-md-4', 'data')}>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? 'Tổng danh thu'
                                                            : tagCurrent === 2
                                                            ? 'Tổng người dùng'
                                                            : 'Tổng đơn hàng'}
                                                    </p>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? formatter.format(caculator(datamoney))
                                                            : tagCurrent === 2
                                                            ? caculator(datauser)
                                                            : caculator(dataorder)}
                                                    </p>
                                                </div>
                                                <div className={cx('col-6 col-lg-6 col-md-6', 'data')}>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? 'Doanh thu tháng cao nhất'
                                                            : tagCurrent === 2
                                                            ? 'Số người dùng mới tháng cao nhất'
                                                            : 'Số đơn hàng tháng cao nhất'}
                                                    </p>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? formatter.format(Math.max(...datamoney))
                                                            : tagCurrent === 2
                                                            ? Math.max(...datauser)
                                                            : Math.max(...dataorder)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col-12 col-lg-6 col-md-6')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-6 col-lg-6 col-md-6', 'data')}>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? 'Doanh thu tháng thấp nhất'
                                                            : tagCurrent === 2
                                                            ? 'Số người dùng mới tháng thấp nhất'
                                                            : 'Số đơn hàng tháng thấp nhất'}
                                                    </p>
                                                    <p>{tagCurrent === 1 ? formatter.format(0) : 0}</p>
                                                </div>
                                                <div className={cx('col-4 col-lg-4 col-md-4', 'data')}>
                                                    <p>Tháng hiện tại:</p>
                                                    <p>
                                                        {tagCurrent === 1
                                                            ? formatter.format(datamoney[11])
                                                            : tagCurrent === 2
                                                            ? datauser[11]
                                                            : dataorder[11]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row', 'chart')}>
                                    <Line data={tagCurrent === 1 ? data : tagCurrent === 2 ? tableuser : tableorder} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statistical;
