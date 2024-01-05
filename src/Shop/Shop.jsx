/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Search from "./Component/Search";
import Pagination from "./Component/Pagination";
import Products from "./Component/Products";
import SortProduct from "./Component/SortProduct";
import convertMoney from "../convertMoney";
import menuIcon from "../Share/img/menu_icon_2.png";

function Shop(props) {
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(false);

  //state dùng để sắp xếp sản phẩm
  const [sort, setSort] = useState("default");

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  // Get category parram from url by localtion
  const category =
    new URLSearchParams(window.location.search).get("category") || "all";

  //Từng trang hiện tại
  const [pagination, setPagination] = useState({
    page: "1",
    count: "9",
    search: "",
    category: category,
  });

  //Hàm nà dùng để lấy value từ component SortProduct truyền lên
  const handlerChangeSort = (value) => {
    console.log("Value: ", value);

    setSort(value);
  };

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.search
  //Hàm này sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerSearch = (value) => {
    console.log("Value: ", value);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.category
  const handlerCategory = (value) => {
    console.log("Value: ", value);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: pagination.search,
      category: value,
    });
  };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      let response;
      let data;
      // Nếu mà category === 'all' thì nó sẽ gọi hàm get tất cả sản phẩm
      // Ngược lại thì nó sẽ gọi hàm pagination và phân loại sản phẩm
      if (pagination.category === "all") {
        response = await ProductAPI.getAPI();
        console.log(response);
      } else {
        const params = {
          page: pagination.page,
          count: pagination.count,
          search: pagination.search,
          category: pagination.category,
        };

        const query = queryString.stringify(params);

        const newQuery = "?" + query;

        data = await ProductAPI.getPagination(newQuery);
        response = data.result;
        console.log(response);
      }

      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(
        parseInt(response?.length) / parseInt(pagination.count)
      );

      setTotalPage(totalPage);
    };

    fetchAllData();
  }, [pagination]);

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      const data = await ProductAPI.getPagination(newQuery);
      const response = data;
      setProducts(response);
      setTemp(response);
      setLoading(false);
    };

    fetchData();
  }, [pagination]);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cửa hàng</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Hân hạnh được đón tiếp quý khách!
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* -------------Modal Product----------------- */}
      {products &&
        products.map((value) => (
          <div
            className="modal fade show"
            id={`product_${value._id}`}
            key={value._id}
          >
            <div
              className="modal-dialog modal-lg modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body p-0">
                  <div className="row align-items-stretch">
                    <div className="col-lg-6 p-lg-0">
                      <img
                        alt="img1"
                        style={{ width: "100%" }}
                        className="product-view d-block h-100 bg-cover bg-center"
                        src={value.img1}
                        data-lightbox={`product_${value._id}`}
                      />
                      <img alt="img2" className="d-none" href={value.img2} />
                      <img alt="img3" className="d-none" href={value.img3} />
                    </div>
                    <div className="col-lg-6">
                      {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                      <a
                        className="close p-4"
                        type="button"
                        href="#section_product"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        ×
                      </a>
                      <div className="p-5 my-md-4">
                        <ul className="list-inline mb-2">
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                          <li className="list-inline-item m-0">
                            <i className="fas fa-star small text-warning"></i>
                          </li>
                        </ul>
                        <h2 className="h4">{value.name}</h2>
                        <p className="text-muted">
                          {convertMoney(value.price)} VND
                        </p>
                        <p className="text-small mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. In ut ullamcorper leo, eget euismod orci. Cum
                          sociis natoque penatibus et magnis dis parturient
                          montes nascetur ridiculus mus. Vestibulum ultricies
                          aliquam convallis.
                        </p>
                        <div className="row align-items-stretch mb-4">
                          <div className="col-sm-5 pl-sm-0 fix_addwish">
                            <a className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">
                              <i className="far fa-heart mr-2"></i>
                              Add Too Wish List
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* -------------Modal Product----------------- */}

      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div
              className="col-lg-3 order-2 order-lg-1 "
              style={{ height: "max-content" }}
            >
              <div className="text-uppercase mb-4 header_category ">
                Danh mục sản phẩm
              </div>
              <div className="py-2 px-4 mb-3 mt-3 bg-light">
                <strong className="small text-uppercase font-weight-bold ">
                  Bánh Cao Cấp
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal header_category_border_bottom">
                <li className="mb-2">
                  <img
                    src={menuIcon}
                    alt="image_icon"
                    style={{ filter: "saturate(3)" }}
                  />
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("all")}
                  >
                    Bộ sưu tập bánh
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Bánh tặng quà
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal header_category_border_bottom">
                <li className="mb-2 ">
                  <a
                    className="reset-anchor "
                    href="#"
                    onClick={() => handlerCategory("chocolate")}
                  >
                    Bánh Chocolate
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("pastry")}
                  >
                    Bánh ngọt
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("custard")}
                  >
                    Bánh bông lan
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Bánh ăn vặt
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal header_category_border_bottom">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("seasonal")}
                  >
                    Bánh theo mùa
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("jelly")}
                  >
                    Bánh rau câu
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("bread")}
                  >
                    Bánh mì
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("cheesecake")}
                  >
                    Bánh kem
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Các loại bánh khác
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal mb-5">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("other")}
                  >
                    Bánh khác
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                {/* ------------------Search----------------- */}
                <Search handlerSearch={handlerSearch} />
                {/* ------------------Search----------------- */}

                <div className="col-lg-8">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <li className="list-inline-item">
                      <SortProduct handlerChangeSort={handlerChangeSort} />
                    </li>
                  </ul>
                </div>
              </div>

              {loading ? (
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">
                    <h4>Loading please wait...</h4>
                  </span>
                </div>
              ) : (
                <Products products={products} sort={sort} />
              )}

              <Pagination
                pagination={pagination}
                handlerChangePage={handlerChangePage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
