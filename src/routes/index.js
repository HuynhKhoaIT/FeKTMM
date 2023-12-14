import { HeaderOnly } from '../Layout';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import CheckOut from '../pages/CheckOut';
import VnPayPayment from '../pages/CheckOut/VnPayPayment';
import Account from '../pages/Account';
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword/forget-password';
import ResetPassWordByOTPForUsers from '../pages/ForgetPassword/ResetPassWordByOTPForUsers/ResetPassWordByOTPForUsers';
import AdminLogin from '../pages/Admin/AdminLogin/AdminLogin';
import ShipperLogin from '../pages/Shipper/ShipperLogin/ShipperLogin';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import Search from '../pages/Search/Search';
import Signup from '../pages/Signup/Signup';
import CustomerManager from '../pages/Admin/CustomerManager';
import EmployeeManager from '../pages/Admin/EmployeeManager';
import ProductManager from '../pages/Admin/ProductManager';
import OrderManager from '../pages/Admin/OrderManager';
import ProfileAdmin from '../pages/Admin/ProfileAdmin';
import Statistical from '../pages/Admin/Statistical';
import Profile from '../pages/Shipper/Profile/Profile';
import ChangePass from '../pages/Shipper/ChangePass/ChangePass';
import Otp from '../pages/Shipper/Otp/Otp';
import Order from '../pages/Shipper/Order/Order';
import Category from '../pages/Category';

import ProfileCustomer from '../pages/Profile/ProfileCustomer';
import CheckOrder from '../pages/CheckOrder/CheckOrder';
// public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart, layout: HeaderOnly },
    { path: '/category', component: Category },
    { path: '/login', component: Login, layout: null },
    { path: '/forget-password', component: ForgetPassword, layout: null },
    { path: '/forget-password/reset-password', component: ResetPassWordByOTPForUsers, layout: null },
    { path: '/signup', component: Signup, layout: null },
    { path: '/product-detail', component: ProductDetail },
    { path: '/cart/checkout', component: CheckOut },
    { path: '/cart/vnPayPayment', component: VnPayPayment },
    { path: '/search', component: Search },
    { path: '/admin/', component: AdminLogin, layout: null },
    { path: '/profile', component: ProfileCustomer, layout: HeaderOnly },
    { path: '/check-order', component: CheckOrder, layout: HeaderOnly },
    { path: '/admin/customer-manager', component: CustomerManager, layout: null },
    { path: '/admin/shipper-manager', component: EmployeeManager, layout: null },
    { path: '/admin/product-manager', component: ProductManager, layout: null },
    { path: '/admin/order-manager', component: OrderManager, layout: null },
    { path: '/admin/profile', component: ProfileAdmin, layout: null },
    { path: '/shipper/', component: ShipperLogin, layout: null },
    { path: '/admin/statistical', component: Statistical, layout: null },
    { path: '/shipper/profile', component: Profile, layout: null },
    { path: '/shipper/changePass', component: ChangePass, layout: null },
    { path: '/shipper/otp', component: Otp, layout: null },
    { path: '/shipper/order', component: Order, layout: null },
    { path: '/shipper/profile', component: Profile, layout: null },
    { path: '/shipper/changePass', component: ChangePass, layout: null },
    { path: '/shipper/otp', component: Otp, layout: null },
    { path: '/shipper/order', component: Order, layout: null },
];
// Private Routes
const privateRoutes = [{ path: '/account', component: Account }];

export { publicRoutes, privateRoutes };
