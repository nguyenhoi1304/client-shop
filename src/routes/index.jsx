import Detail from "../pages/Detail/Detail";
import Cart from "../pages/Cart/Cart";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
import Checkout from "../pages/Checkout/Checkout";
import Shop from "../pages/Shop/Shop";
import Home from "../pages/Home/Home";
import MainHistory from "../pages/History/component/MainHistory";
import DetailHistory from "../pages/History/component/DetailHistory";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/detail/:id", component: Detail, layout: null },
  { path: "/cart", component: Cart },
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
  { path: "/checkout", component: Checkout },
  { path: "/shop", component: Shop },
  { path: "/shop/:valueSearchHome", component: Shop },
  { path: "/history", component: MainHistory },
  { path: "/history/:idHistory", component: DetailHistory },
];

export default publicRoutes;
