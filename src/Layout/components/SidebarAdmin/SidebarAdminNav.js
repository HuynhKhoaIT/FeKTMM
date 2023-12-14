import React from 'react';
import { DarkUserIcon } from '../../../components/Icons';
export const SidebarAdminNav = [
    {
        title: 'NAME',
        icon: <DarkUserIcon />,
        to: '/admin/profile',
    },
    {
        title: 'Quản lý sản phẩm',
        icon: null,
        to: '/admin/product-manager',
    },
    {
        title: 'Quản lý khách hàng',
        icon: null,
        to: '/admin/customer-manager',
    },
    {
        title: 'Quản lý shipper',
        icon: null,
        to: '/admin/shipper-manager',
    },
    {
        title: 'Quản lý đơn hàng',
        icon: null,
        to: '/admin/order-manager',
    },
    {
        title: 'Thống kê',
        icon: null,
        to: '/admin/statistical',
    },
];
