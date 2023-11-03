import styles from './Comment.module.scss'
import classNames from 'classnames/bind'
import { RatingStar } from '../../../components/Icons/Icons';
const cx = classNames.bind(styles)
function Comment(props) {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <div className={cx('star-styles')}>
                    <RatingStar key={i} />
                </div>
            );
        }

        return stars;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overview-wrapper')}>
                <div className={cx('uImge-wrapper')}>
                    <img className={cx('uImage')} src='https://lh3.googleusercontent.com/ogw/AGvuzYZ97zGHplrj5kwwvMUP3V3XYo97H9v-s-NCvLgLeA=s32-c-mo' alt='user'></img>
                </div>
                <div className={cx('name-wrapper')}>
                    <p className={cx('uName')}>{props.fName} {props.lName}</p>
                    <div className={cx('stars-display')}>
                        <div className={cx('stars')}>
                            <div className={cx('stars-wrapper')}>
                                {renderStars(props.stars)}
                            </div>
                        </div>
                        <p className={cx('rating-points')}>({props.stars})</p>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('comment-content')}>
                    <p> {props.content} </p>
                </div>
                <div className={cx('imgs-wrapper')}>
                    {
                        props.images.map((img, index) => {
                            return <div className={cx('img-wrapper')}>
                                <img key={index} className={cx('cmtImg')} src={img} alt='Hình ảnh sản phẩm'></img>
                            </div>
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Comment
