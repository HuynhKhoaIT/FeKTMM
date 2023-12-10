import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProductManager.module.scss";
import ListProduct from "./ListProduct/ListProduct";
import ProductListItem from "../../../components/ProductListItem";
import SidebarAdmin from "../../../Layout/components/SidebarAdmin";
import SidebarAdminMobi from "../../../Layout/components/SidebarAdmin/SidebarAdminMobi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Image from "../../../components/Images";
import * as productService from "../../../services/productService";
import * as categoryService from "../../../services/categoryService";

const cx = classNames.bind(styles);
function ProductManager() {
  const [reloadData, setReloadData] = useState(true);
  const [pId, setpId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [salePercent, setSalePercent] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [brands, setBrands] = useState([
    {
      _id: "",
      _name: "",
    },
  ]);

  const [categories, setCategories] = useState([
    {
      _id: "",
      _name: "",
      status: true,
    },
  ]);

  //get all brands
  useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const response = await fetch(
          "https://cnpmmnhom14.onrender.com/api/brands"
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        //console.log(data)
        setBrands(data);
      } catch (error) {
        console.error("Không lấy được dữ liệu: ", error);
      }
    };
    fetchAllBrands();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryService.getAllCategories();
      setCategories(result);
    };
    fetchApi();
  }, []);

  const [productListItems, setProductListItems] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await productService.getAllProducts();
      setProductListItems(result);
    };
    if (reloadData) {
      fetchApi();
      setReloadData(false); // Đặt lại state để ngăn việc gọi lại liên tục
    }
  }, [reloadData]);

  const hideProduct = async (pId) => {
    try {
      const response = await productService.hideProduct(pId);
      if (response === 0) {
        throw new Error("Yêu cầu không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu ẩn sản phẩm:", error);
      return null;
    }
  };

  const hideItem = (itemId) => {
    const shouldHide = window.confirm("Bạn có muốn ẩn sản phẩm này không?");
    if (shouldHide) {
      hideProduct(itemId);
      setReloadData(true);
    }
  };

  const activeProduct = async (pId) => {
    try {
      const response = await productService.activeProduct(pId);
      if (response === 0) {
        throw new Error("Yêu cầu không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu kích hoạt sản phẩm:", error);
      return null;
    }
  };

  const activeItem = (itemId) => {
    const shouldActive = window.confirm(
      "Bạn có muốn kích hoạt sản phẩm này không?"
    );
    if (shouldActive) {
      activeProduct(itemId);
      setReloadData(true);
    }
  };

  const [currentPage, setCurrentPage] = useState(1); // page mặc định là 1
  const totalPages = Math.ceil(productListItems.length / 5); // số page mỗi page 5 item
  const pageItems = [];
  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(i);
  }
  const startIndex = (currentPage - 1) * 5; // item bắt đầu cho mỗi page
  const endIndex = startIndex + 5; // item kết thúc cho mỗi page
  const currentItems = productListItems.slice(startIndex, endIndex); // item cho page hiện tại

  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const showAddProductModal = () => setAddProduct(true);
  const closeAddProductModal = () => setAddProduct(false);
  const closeEditProductModal = () => setEditProduct(false);

  const getProduct = async (pId) => {
    try {
      const result = await productService.getProductDetails(pId);
      setpId(pId);
      setName(result._name);
      setQuantity(result._quantity);
      setPrice(result._price);
      setSalePercent(result._salePercent);
      setDetail(result._detail);
      setImages(result._images);
      setCategory(result._categoryId);
      setBrand(result._brandId._id);
      if (result === 0) {
        throw new Error("Yêu cầu không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      return null;
    }
  };

  const showEditProductModal = (pId) => {
    setEditProduct(true);
    getProduct(pId);
  };

  const editItem = (itemId) => {
    showEditProductModal(itemId);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files; // Lấy danh sách tệp đã chọn

    if (selectedFiles.length > 0) {
      const filePromises = Array.from(selectedFiles).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((results) => {
          // results là một mảng các URL hình ảnh đã mã hóa
          setImages(results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleAddProduct = async () => {
    const newProduct = {
      _name: name,
      _quantity: quantity,
      _price: price,
      _salePercent: salePercent,
      _detail: detail,
      _images: images,
      _categoryId: category,
      _brandId: brand,
    };
    const result = await productService.addProduct(newProduct);
    if (result !== null) {
      setName("");
      setQuantity("");
      setPrice("");
      setSalePercent("");
      setDetail("");
      setImages([]);
      setCategory("");
      setBrand("");
      window.alert("Thêm sản phẩm thành công");
      closeAddProductModal();
      setReloadData(true);
    }
  };

  const handleEditProduct = async (pId) => {
    const editData = {
      _name: name,
      _quantity: quantity,
      _price: price,
      _salePercent: salePercent,
      _detail: detail,
      _images: images,
      _categoryId: category,
      _brandId: brand,
    };
    const result = await productService.editProduct(pId, editData);
    if (result !== null) {
      setName("");
      setQuantity("");
      setPrice("");
      setSalePercent("");
      setDetail("");
      setImages([]);
      setCategory("");
      setBrand("");
      window.alert("cập nhật sản phẩm thành công");
      closeEditProductModal();
      setReloadData(true);
    }
  };

  return (
    <div className={cx("container-fluid")}>
      <div className={cx("row", "d-flex")}>
        <div
          className={cx(
            "col-lg-3 col-xl-2 d-none d-xl-block",
            "sidebar-wrapper"
          )}
        >
          <SidebarAdmin />
        </div>
        <div className={cx("d-block d-xl-none", "sidebar-mobi-wrapper")}>
          <SidebarAdminMobi />
        </div>
        <div
          className={cx(
            "col-12 col-lg-12 col-xl-10 container-fluid",
            "content-section"
          )}
        >
          <div className={cx("d-flex align-items-center ", "title")}>
            Quản lý sản phẩm
          </div>
          <div className={cx("wrapper")}>
            <div className={cx("content")}>
              <div className={cx("container-fluid")}>
                <div className={cx("add-btn")}>
                  <button
                    className={cx("btn btn-primary btn-lg font-weight-bold")}
                    onClick={showAddProductModal}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Thêm
                  </button>
                </div>
                <div
                  className={cx(
                    "row align-items-center d-none d-md-flex",
                    "header"
                  )}
                >
                  <div
                    className={cx(
                      "col-lg-1 col-md-1 d-flex justify-content-center"
                    )}
                  >
                    <p>ID</p>
                  </div>
                  <div
                    className={cx(
                      "col-lg-5 col-md-5 d-flex justify-content-center"
                    )}
                  >
                    <p>Sản phẩm</p>
                  </div>
                  <div
                    className={cx(
                      "col-lg-2 col-md-2 d-flex justify-content-center"
                    )}
                  >
                    <p>Giá</p>
                  </div>
                  <div
                    className={cx(
                      "col-lg-2 col-md-2 d-flex justify-content-center"
                    )}
                  >
                    <p>Số lượng</p>
                  </div>
                  <div
                    className={cx(
                      "col-lg-2 col-md-2 d-flex justify-content-center"
                    )}
                  >
                    <p>Thao tác</p>
                  </div>
                </div>
                <div className={cx("row align-items-center", "product-list")}>
                  <ListProduct>
                    {currentItems.map((item) => (
                      <ProductListItem
                        pId={item._id}
                        product={item._name}
                        price={item._price}
                        quantity={item._quantity}
                        image={item._images[0]}
                        editItem={() => editItem(item._id)}
                        hideItem={() => hideItem(item._id)}
                        activeItem={() => activeItem(item._id)}
                        status={item._status}
                      />
                    ))}
                  </ListProduct>
                </div>
                <div className={cx("d-flex justify-content-center", "paging")}>
                  <ul className={cx("pagination pagination-lg")}>
                    {currentPage === 1 ? (
                      <li className={cx("page-item disabled")}>
                        <span className={cx("page-link")}>Trước</span>
                      </li>
                    ) : (
                      <li className={cx("page-item")}>
                        <span
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className={cx("page-link")}
                        >
                          Trước
                        </span>
                      </li>
                    )}
                    {pageItems.map((index) =>
                      currentPage === index ? (
                        <li className={cx("page-item active")}>
                          <span className={cx("page-link")}>{index}</span>
                        </li>
                      ) : (
                        <li className={cx("page-item")}>
                          <span
                            onClick={() => setCurrentPage(index)}
                            className={cx("page-link")}
                          >
                            {index}
                          </span>
                        </li>
                      )
                    )}
                    {currentPage === totalPages ? (
                      <li className={cx("page-item disabled")}>
                        <span className={cx("page-link")}>Sau</span>
                      </li>
                    ) : (
                      <li className={cx("page-item")}>
                        <span
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className={cx("page-link")}
                        >
                          Sau
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={addProduct}
            onHide={closeAddProductModal}
            className={cx("add-product-modal")}
          >
            <Modal.Header closeButton>
              <div className={cx("title-modal")}>Thêm sản phẩm</div>
            </Modal.Header>
            <Modal.Body>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Tên sản phẩm:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Số lượng:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Giá:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Giảm giá:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setSalePercent(e.target.value)}
                />
              </div>

              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Thông tin:</div>
                </div>
                <textarea
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setDetail(e.target.value)}
                ></textarea>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Hình ảnh:</div>
                </div>
                <div class={cx("col-lg-9 col-md-9")}>
                  <div class={cx("center")}>
                    <input
                      type="file"
                      class={cx("form-control")}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                  </div>
                  <div className={cx("col-lg-12 ", "d-flex")}>
                    {images.map((image) => (
                      <div class={cx("col-lg-2 col-md-2")}>
                        <Image src={image} alt="img" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Category</div>
                </div>
                <select
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option value={category._id}>{category._name}</option>
                  ))}
                </select>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Brand</div>
                </div>
                <select
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((brand) => (
                    <option value={brand._id}>{brand._name}</option>
                  ))}
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className={cx("btn btn-secondary btn-lg")}
                onClick={closeAddProductModal}
              >
                Đóng
              </button>
              <button
                className={cx("btn btn-primary btn-lg")}
                onClick={handleAddProduct}
              >
                Thêm
              </button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={editProduct}
            onHide={closeEditProductModal}
            className={cx("add-product-modal")}
          >
            <Modal.Header closeButton>
              <div className={cx("title-modal")}>Thêm sản phẩm</div>
            </Modal.Header>
            <Modal.Body>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Tên sản phẩm:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Số lượng:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Giá:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Giảm giá:</div>
                </div>
                <input
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  value={salePercent}
                  onChange={(e) => setSalePercent(e.target.value)}
                />
              </div>

              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Thông tin:</div>
                </div>
                <textarea
                  type="text"
                  className={cx("col-lg-9 col-md-9")}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                ></textarea>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Hình ảnh:</div>
                </div>
                <div class={cx("col-lg-9 col-md-9")}>
                  <div class={cx("center")}>
                    <input
                      type="file"
                      class={cx("form-control")}
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                  </div>
                  <div className={cx("col-lg-12 ", "d-flex")}>
                    {images.map((image) => (
                      <div class={cx("col-lg-2 col-md-2")}>
                        <Image src={image} alt="img" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Category</div>
                </div>
                <select
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((categoryy) => (
                    <option
                      value={categoryy._id}
                      selected={categoryy._id === category ? true : false}
                    >
                      {categoryy._name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={cx("row align-items-center")}>
                <div className={cx("col-lg-3 col-md-3", "heading-modal")}>
                  <div>Brand</div>
                </div>
                <select
                  className={cx("col-lg-9 col-md-9")}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((brandd) => (
                    <option
                      value={brandd._id}
                      selected={brandd._id === brand ? true : false}
                    >
                      {brandd._name}
                    </option>
                  ))}
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className={cx("btn btn-secondary btn-lg")}
                onClick={closeEditProductModal}
              >
                Đóng
              </button>
              <button
                className={cx("btn btn-primary btn-lg")}
                onClick={(e) => handleEditProduct(pId)}
              >
                Cập nhật
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProductManager;
