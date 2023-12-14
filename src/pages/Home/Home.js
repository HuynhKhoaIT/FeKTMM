import Products from "./Products/products.js";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Container from "react-bootstrap/Container";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import ImageSlider from "../../components/Slider/slider.js";
import { Row, Col, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import ColProductCard from "../../components/Product/product";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import baner1 from "../../assets/images/baner1.webp";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.webp";

import ProductItem from "../../components/Product/productItem.js";
import { Link } from "react-router-dom";
import { ProductSlider } from "./Products/productSlider.js";
import { getAllCategories } from "../../services/categoryService.js";
import { getAllProductsByCategory } from "../../services/productService.js";
const cx = classNames.bind(styles);
function Home() {
  const [category, setCategory] = useState();
  const [laptopData, setLaptopData] = useState();

  const [banners, setBanners] = useState([
    "https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw",
    "https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw",
    "https://lh3.googleusercontent.com/AlIQ9zLNegLMYK3iZ0C38iJTsSuSBolyYK4SH_LmhKgohVHcmz6atxdRtydFItYjNYbhBf_ZdBKg6n0IyHbKOvC7EwqAsQc=w1920-rw",
  ]);
  const [loading, setLoading] = useState(false);
  //Lấy danh sách hình banners
  useEffect(() => {
    let mounted = true;
    fetch("https://cnpmmnhom14.onrender.com/api/banners")
      .then((response) => response.json())
      .then((banners) => {
        if (mounted) {
          console.log(banners);
          setBanners(banners[0]._images);
        }
        return () => !mounted;
      })
      .catch((error) => console.log("Failed to retrieve data"));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getAllCategories();
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchProductByCategory = async (id) => {
      try {
        const data = await getAllProductsByCategory(id);
        setLaptopData(data);
      } catch (error) {
        console.error(error);
      }
    };
    category?.map((item, index) => {
      if (item?._name === "Laptop") {
        fetchProductByCategory(item?._id);
      }
    });
  }, [category]);
  console.log("laptopData", laptopData);
  return (
    <div style={{ width: "100%", position: "relative" }} className={cx("home")}>
      <Spin spinning={!!loading}>
        <Row style={{ justifyContent: "center" }}>
          <img src="https://hoanghamobile.com/Content/xmas2023/logo.png" />
        </Row>

        <div className={cx("container", "contentHome")} fluid="md">
          <div className={cx("main-section")}>
            <Row className={cx("sliderHome")}>
              <Col span={24}>
                <Slider
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                >
                  <div>
                    <img
                      style={{ width: "auto", height: "366px" }}
                      src={baner1}
                    />
                  </div>
                  <div>
                    <img
                      style={{ width: "auto", height: "366px" }}
                      src={
                        "https://lh3.googleusercontent.com/7u6ZwGXulC8OhyC6LIb6REDtUGTJhLSnINRxt9JVpfbgdZqrY4SwufxLt11Eg-vjNe3vwiNg8R5iRiFA7MD5P2Rn1RENYqqG=w1920-rw"
                      }
                    />
                  </div>
                  <div>
                    <img
                      style={{ width: "auto", height: "366px" }}
                      src={banner3}
                    />
                  </div>
                  <div>
                    <img
                      style={{ width: "auto", height: "366px" }}
                      src={banner4}
                    />
                  </div>
                </Slider>
              </Col>
            </Row>
            <Row gutter={16} className={cx("list-ad")}>
              <Col span={6}>
                <Link to={"/"}>
                  <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/12/06/galaxy-s20-fe.png" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to={"/"}>
                  <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/27/macbook-air.png" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to={"/"}>
                  <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/17/redmi-13c_638358386471916868.png" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to={"/"}>
                  <img src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/22/vivobook-14.png" />
                </Link>
              </Col>
            </Row>

            <Row>
              <Products />
            </Row>
            <Row>
              <ProductSlider dataDetail={laptopData} title={"Lap top"} />
            </Row>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default Home;
