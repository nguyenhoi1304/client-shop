import React, { useEffect, useState } from "react";
import ProductAPI from "../../API/ProductAPI";
import Image from "../../Share/img/Image";
import convertMoney from "../../convertMoney";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Clock from "./Component/Clock";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner_coll_1_1 from "../../Share/img/banner_coll_1_1.jpg";
import banner_coll_1_2 from "../../Share/img/banner_coll_1_2.jpg";
import banner_coll_1_3 from "../../Share/img/banner_coll_1_3.jpg";
import bannerHot from "../../Share/img/section_hot_banner.jpg";

import {
  faChevronRight,
  faTruckFast,
  faHandHoldingHeart,
  faRepeat,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsApi from "../../API/NewsApi";
import Feedback from "./Component/Feedback";

function Home(props) {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [productsLove, setProductsLove] = useState();
  const [loading, setLoading] = useState(false);
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let interval;

  // thời gian kết thúc trong 1 ngày đếm ngược
  const daysInit = new Date().getDate() + 1;
  const monthInit = month[new Date().getMonth()];
  const yearInit = new Date().getFullYear();

  const startTimer = () => {
    const countDownDate = new Date(
      `${monthInit} ${daysInit},${yearInit}`
    ).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // xử lý hiển thị 1 => 01
      const hours = `0${Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      )}`.slice(-2);

      const minutes = `0${Math.floor(
        (distance % (60 * 60 * 1000)) / (1000 * 60)
      )}`.slice(-2);

      const seconds = `0${Math.floor((distance % (60 * 1000)) / 1000)}`.slice(
        -2
      );

      if (distance < 0) {
        //Stop Timer
        clearInterval(interval.current);
      } else {
        //Update Timer
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    startTimer();
  }, []);

  //Fetch Product
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await ProductAPI.getAPI();
      const data = response?.slice(0, 9);
      setProductsLove(response);
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // getAPINEWS
  useEffect(() => {
    const fetchDataNews = async () => {
      setLoading(true);
      const data = await NewsApi.getNews();
      const result = data.slice(0, 8);
      setNews(result);
      setLoading(false);
    };
    fetchDataNews();
  }, []);

  //react-multi-carousel
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles.home}>
      <div className="page-holder">
        <header className="header bg-white">
          {/* Hiển thị phần modal chứa thông tin sản phẩm */}
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
                          <img
                            className="d-none"
                            href={value.img2}
                            alt="img2"
                          />
                          <img
                            className="d-none"
                            href={value.img3}
                            alt="img3"
                          />
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
                            <h2 className="h4">{value.name}</h2>
                            <b className="text-muted">
                              {convertMoney(value.price)} VND
                            </b>
                            <br></br>
                            <p className="text-small mb-4 mt-3">
                              {value.short_desc}
                            </p>
                            <div className="row align-items-stretch mb-4">
                              <div className="col-sm-5 pl-sm-0 fix_addwish">
                                <a
                                  className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                                  href={`/detail/${value._id}`}
                                  target="_top"
                                >
                                  <i className="fa fa-shopping-cart"></i>
                                  <span className="ml-2">Xem chi tiết</span>
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

          <div className="container">
            <section className="mt-5">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={Image.banner1}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={Image.banner2}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={Image.banner3}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={Image.banner4}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={Image.banner5}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </section>

            <section className="mt-5">
              <div className={styles.card_sale}>
                <div className="row p-3">
                  <div className="col-md-3 mt-sm-2">
                    <div
                      className="card mb-0  "
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body">
                        <h6 className="card-title">Nhập mã : Giảm 25K</h6>
                        <p className="card-title">
                          Giảm 25k khi mua 2 sản phẩm trở lên!
                        </p>
                        <div className={styles.cart_body}>
                          <button className={styles.btn_coppy}>Sao chép</button>
                          <button className={styles.btn_condition}>
                            Điều Kiện
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mt-sm-2">
                    <div
                      className="card mb-0  "
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body">
                        <h6 className="card-title">Nhập mã : Giảm 100K</h6>
                        <p className="card-title">
                          Giảm 10k khi mua 3 sản phẩm trở lên!
                        </p>
                        <div className={styles.cart_body}>
                          <button className={styles.btn_coppy}>Sao chép</button>
                          <button className={styles.btn_condition}>
                            Điều Kiện
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mt-sm-2">
                    <div
                      className="card mb-0  "
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body">
                        <h6 className="card-title">Nhập mã : Giảm 99K</h6>
                        <p className="card-title">
                          Giảm 99K khi mua 3 sản phẩm trở lên!
                        </p>
                        <div className={styles.cart_body}>
                          <button className={styles.btn_coppy}>Sao chép</button>
                          <button className={styles.btn_condition}>
                            Điều Kiện
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mt-sm-2">
                    <div
                      className="card mb-0  "
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body">
                        <h6 className="card-title">Nhập mã : Giảm 155K</h6>
                        <p className="card-title">
                          Giảm 155K khi mua đơn hàng 1 triệu
                        </p>
                        <div className={styles.cart_body}>
                          <button className={styles.btn_coppy}>Sao chép</button>
                          <button className={styles.btn_condition}>
                            Điều Kiện
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* mùa yêu, deal ngọt */}
            <section className="pt-5">
              <div className="col-xl-12 col-lg-12 col-sm-12 p-0">
                <header className={styles.love}>
                  <div className={styles.title}>
                    <span className={styles.text_title}>
                      <i
                        className="fas fa-heart mr-2"
                        style={{ color: "red" }}
                      ></i>
                      mùa yêu, deal ngọt
                      <span className={styles.jump1}>H</span>
                      <span className={styles.jump2}>O</span>
                      <span className={styles.jump3}>T</span>
                    </span>
                  </div>
                  <Clock
                    timerHours={timerHours}
                    timerMinutes={timerMinutes}
                    timerSeconds={timerSeconds}
                  />
                </header>
              </div>
              {loading ? (
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">
                    <h4>Loading please wait...</h4>
                  </span>
                </div>
              ) : (
                <>
                  <section className="mt-3">
                    {productsLove && (
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        autoPlaySpeed={3000}
                        autoPlay={props.deviceType !== "mobile" ? true : false}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true} // cuộn đến hết item thì thôi
                        keyBoardControl={true}
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={props.deviceType}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        className={styles.card_love}
                      >
                        {productsLove?.map(
                          (product) =>
                            product.category === "chocolate" && (
                              <div key={product._id} className={styles.card}>
                                <a
                                  className="d-block"
                                  href={`#product_${product._id}`}
                                  data-toggle="modal"
                                >
                                  <img
                                    className={styles.img_love}
                                    src={product.img1}
                                    alt="product_image"
                                  />
                                  <p className={styles.description}>
                                    {product.name}
                                  </p>
                                  <p className={styles.description}>
                                    {convertMoney(product.price)} VND
                                  </p>
                                </a>
                              </div>
                            )
                        )}
                      </Carousel>
                    )}
                  </section>
                </>
              )}
            </section>

            {/* Hot Banner */}
            <section className="bg-light mt-4 mx-0">
              {/* row 1 */}
              <div className="row m-0">
                <div className="col-md-12 px-0">
                  <img className="w-100 pb-4" src={bannerHot} alt="banner" />
                </div>
              </div>
              {/* row 2 */}
              <div className="row text-center pb-3">
                {/* col 1 */}
                <div className="col-lg-4 mb-3 mb-lg-0 p-0">
                  <div className="media align-items-end">
                    <div className="media-body text-left d-flex align-items-center pl-2">
                      <FontAwesomeIcon
                        className={styles.icon_hotbanner}
                        icon={faTruckFast}
                      />
                      <b className="text-uppercase ml-2">Giao hàng đúng giờ</b>
                    </div>
                  </div>
                </div>
                {/* col 2 */}
                <div className="col-lg-4 mb-3 mb-lg-0 p-0">
                  <div className="media align-items-end">
                    <div className="media-body text-left pb-2 d-flex align-items-center">
                      <FontAwesomeIcon
                        className={styles.icon_hotbanner}
                        icon={faHandHoldingHeart}
                      />
                      <b className="text-uppercase ml-2">Ưu đãi mỗi ngày</b>
                    </div>
                  </div>
                </div>
                {/* col 3 */}
                <div className="col-lg-4 mb-3 mb-lg-0 p-0">
                  <div className="media align-items-end">
                    <div className="media-body text-left  d-flex align-items-center">
                      <FontAwesomeIcon
                        className={styles.icon_hotbanner}
                        icon={faRepeat}
                      />
                      <b className="text-uppercase ml-2">
                        Đổi trả trong vòng 7 ngày
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sản phẩm bán chạy */}
            <section className="py-5" id="section_product">
              <header className={styles.bestseller}>
                <div className={styles.title}>
                  <span className={styles.text_title}>
                    <i className="fas fa-truck mr-2" />
                    sản phẩm bán chạy
                    <span className={styles.jump1}>H</span>
                    <span className={styles.jump2}>O</span>
                    <span className={styles.jump3}>T</span>
                  </span>
                </div>
              </header>
              {loading ? (
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">
                    <h4>Loading please wait...</h4>
                  </span>
                </div>
              ) : (
                <div className="row mx-0">
                  {products &&
                    products.map((value) => (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6 px-0"
                        key={value._id}
                      >
                        <div className="product text-center">
                          <div className="position-relative mb-3">
                            <a
                              className="d-block"
                              href={`#product_${value._id}`}
                              data-toggle="modal"
                            >
                              <img
                                className={styles.product_img}
                                src={value.img1}
                                alt=""
                              />
                            </a>
                            {/*  overlay */}
                            <div className="product-overlay ">
                              <ul className="mb-0 list-inline ">
                                <li className="list-inline-item m-0 p-0">
                                  <span className="btn btn-sm btn-outline-dark">
                                    <i className="fas fa-heart text-danger"></i>
                                  </span>
                                </li>
                                <li className="list-inline-item m-0 p-0">
                                  <Link
                                    className="btn btn-sm btn-dark"
                                    to={`/detail/${value._id}`}
                                  >
                                    Xem chi tiết
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <strong>
                            <Link
                              className="reset-anchor"
                              to={`/detail/${value._id}`}
                            >
                              {value.name}
                            </Link>
                          </strong>
                          <p className="small text-muted">
                            {convertMoney(value.price)} VND
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </section>

            <section className="d-flex align-items-center justify-content-center">
              <Link to="/shop">
                <button className={styles.btn_all}>
                  xem tất cả
                  <FontAwesomeIcon
                    className={styles.iconRight}
                    icon={faChevronRight}
                  />
                </button>
              </Link>
            </section>

            {/*  banner deal sock*/}
            <div className="container">
              <section className="row mt-4">
                <div className="col-md-4 px-0">
                  <img
                    className="w-100 h-40 pr-2 rounded"
                    src={banner_coll_1_1}
                    alt="banner_hot"
                  />
                </div>
                <div className="col-md-4 px-1 px-0">
                  <img
                    className="w-100 h-40  rounded"
                    src={banner_coll_1_2}
                    alt="banner_hot"
                  />
                </div>
                <div className="col-md-4 px-0">
                  <img
                    className="w-100 h-40 pl-2 rounded"
                    src={banner_coll_1_3}
                    alt="banner_hot"
                  />
                </div>
              </section>
            </div>

            {/* NEWS*/}
            {loading ? (
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">
                  <h4>Loading please wait...</h4>
                </span>
              </div>
            ) : (
              <section>
                <div className="row mt-4 mx-0">
                  <div className={styles.title_about_cake}>
                    <p className={styles.text_title}>
                      <FontAwesomeIcon
                        className="mr-2 text-white ml-2"
                        icon={faNewspaper}
                      />
                      tin tức về bánh
                    </p>
                  </div>
                  <div className="row px-0">
                    {news?.map((item) => (
                      <div className="col-md-6">
                        <div className="row px-0  mt-4">
                          <div className="col-md-6 d-flex">
                            <img
                              className={styles.imgNews}
                              src={item.image}
                              alt=""
                            />
                          </div>
                          <div className="col-md-6 w-100">
                            <h5 className="mb-2">{item.title}</h5>
                            <a
                              href="/home"
                              alt=""
                              className={styles.news_description}
                            >
                              {item.description}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* FeedBack */}
            <section>
              <Feedback />
            </section>

            <section className="py-5">
              <div className="row d-flex align-items-center">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h5 className="text-inherit">
                    Đăng ký email của bạn để nhận nhiều ưu đãi!
                  </h5>
                </div>
                <div className="col-lg-6">
                  <form action="#">
                    <div className="input-group flex-column flex-sm-row mb-3 ">
                      <input
                        className="form-control form-control-lg py-3 rounded-left "
                        type="email"
                        placeholder="Nhập email"
                        aria-describedby="button-addon2"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-success btn-block rounded-right"
                          id="button-addon2"
                          type="submit"
                        >
                          Đăng ký
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Home;
