import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import styles from './index.module.scss';

const Loading = ({ show }) => {
    return show ? (
        <div className={styles.loadingOverlay}>
            <div className={styles.loading}>
                <Spin size="large" />
            </div>
        </div>
    ) : null;
};
export default Loading;
