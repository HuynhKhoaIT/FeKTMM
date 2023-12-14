import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './Layout';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from './redux/Reducer';
// Hãy giả sử có một biến state cho biết trạng thái đăng nhập của người dùng
const isAuthenticated = true; // true nếu người dùng đã đăng nhập, false nếu chưa
const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
// Component cho việc kiểm tra điều kiện đăng nhập của người dùng
function AuthWrapper({ children }) {
    // Kiểm tra trạng thái đăng nhập
    if (isAuthenticated) {
        return <Fragment>{children}</Fragment>;
    } else {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/login" />;
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <AuthWrapper>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </AuthWrapper>
                                    }
                                />
                            );
                        })}
                    </Routes>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        limit={1}
                    />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
