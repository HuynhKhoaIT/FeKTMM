import React from 'react'
import styles from './PaginationBar.module.sass'
import classNames from 'classnames/bind'
import Pagination from 'react-bootstrap/Pagination';
const cx = classNames.bind(styles)

function PaginationBar({ pages = 1 }) {

    let active = 7 //mặc định là ở trang đầu tiên
    let items = [];
    for (let number = 1; number <= pages; number++) {
        if (number > active - 3 && number < active + 3) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    }
    return (
        <Pagination size="lg">
            {
                active >= 6 && active <= 15 ? (
                    <>
                        <Pagination.First />
                        <Pagination.Prev />
                        {items}
                        <Pagination.Next />
                        <Pagination.Last />
                    </>

                ) : (
                    <>
                        <Pagination.First />
                        <Pagination.Prev />
                        {items}
                        <Pagination.Next />
                        <Pagination.Last />
                    </>
                )
            }

        </Pagination>

    );

}
export default PaginationBar