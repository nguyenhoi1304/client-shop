import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import Image from "../Share/img/Image";
import convertMoney from "../convertMoney";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Clock from "./Clock";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Feedback from "../Feedback/Feedback";

function Home(props) {
  const [products, setProducts] = useState([]);
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
  const daysInit = new Date().getDay() + 1;
  const monthInit = month[new Date().getMonth()];
  const yearInit = new Date().getFullYear();

  const startTimer = () => {
    const countDownDate = new Date(
      `${daysInit} ${monthInit},${yearInit}`
    ).getTime();
    console.log(daysInit);
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
    <>
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
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src={Image.banner1}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src={Image.banner2}
                      className={styles.img_banner}
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
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
                  class="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
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
                        <h6 className="card-title">Nhập mã : Giảm 10K</h6>
                        <p className="card-title">Giảm 10k khi mua sản phẩm!</p>
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
                          {" "}
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
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">
                    <h4>Loading please wait...</h4>
                  </span>
                </div>
              ) : (
                <>
                  <section className="mt-3">
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      showDots={true}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true} // cuộn đến hết item thì thôi
                      keyBoardControl={true}
                      transitionDuration={500}
                      rtl={true}
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
                  </section>
                </>
              )}
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
                <div className="row">
                  {products &&
                    products.map((value) => (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6"
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
            <section className="py-5 bg-light">
              <div className="container">
                <div className="row text-center">
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#delivery-time-1"></use>
                        </svg>
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1">Free shipping</h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#helpline-24h-1"> </use>
                        </svg>
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1">
                            24 x 7 service
                          </h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#label-tag-1"> </use>
                        </svg>
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1">
                            Festival offer
                          </h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FeedBack */}
            <section>
              <Feedback />
            </section>

            <section className="py-5">
              <div className="container p-0">
                <div className="row">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <h5 className="text-capitalize">
                      Đăng ký email của bạn để nhận nhiều ưu đãi!
                    </h5>
                  </div>
                  <div className="col-lg-6">
                    <form action="#">
                      <div className="input-group flex-column flex-sm-row mb-3">
                        <input
                          className="form-control form-control-lg py-3"
                          type="email"
                          placeholder="Enter your email address"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-dark btn-block"
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
              </div>
            </section>
          </div>
        </header>
      </div>
    </>
  );
}

export default Home;
