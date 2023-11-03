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

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [12, 19, 3, 5, 2, 1, 3, 65, 12, 43, 54, 12],
                fill: true,
                borderColor: 'rgb(255, 0, 0)',
            },
        ],
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
                                                Đơn hàng
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setTagcurrent(2)}
                                                type="button"
                                                class="btn btn-light btn-outline-dark"
                                            >
                                                Đơn hàng
                                            </button>
                                        )}
                                        {tagCurrent === 3 ? (
                                            <button type="button" class="btn btn-light btn-outline-dark active">
                                                Người dùng mới
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setTagcurrent(3)}
                                                type="button"
                                                class="btn btn-light btn-outline-dark"
                                            >
                                                Người dùng mới
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className={cx('filter-time')}>
                                    <select>
                                        <option value="option1">Theo tháng</option>
                                        <option value="option2">Theo năm</option>
                                    </select>
                                </div>
                                <div className={cx('row', 'statistical')}>
                                    <div className={cx('row', 'statistics')}>
                                        <div className={cx('col-12 col-lg-6 col-md-6')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-4 col-lg-4 col-md-4', 'data')}>
                                                    <p>Tổng doanh thu:</p>
                                                    <p>1.000.000.000đ</p>
                                                </div>
                                                <div className={cx('col-6 col-lg-6 col-md-6', 'data')}>
                                                    <p>Doanh thu tháng cao nhất:</p>
                                                    <p>100.000.000đ</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col-12 col-lg-6 col-md-6')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-6 col-lg-6 col-md-6', 'data')}>
                                                    <p>Doanh thu tháng thấp nhất:</p>
                                                    <p>50.000.000đ</p>
                                                </div>
                                                <div className={cx('col-4 col-lg-4 col-md-4', 'data')}>
                                                    <p>Tháng hiện tại:</p>
                                                    <p>100.000.000đ</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('row', 'chart')}>
                                    <Line data={data} />
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
