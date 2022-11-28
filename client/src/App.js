import Navbar from "./modules/navbar/components/navbar"
import PaymentPage from "./modules/payment/components/PaymentPage";
import LandingPage from "./modules/showcase/components/LandingPage";
import ManageOrderPage from "./modules/admin/components/ManageOrderPage";
import ManageProductPage from "./modules/admin/components/ManageProductPage";
import UserOrderPage from "./modules/admin/components/UserOrderPage";
import Footer from "./modules/footer/footer"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CartProvider from "./modules/store/CartProvider";


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/payment">
            <PaymentPage/>
          </Route>

          <Route path="/manageorder">
            <ManageOrderPage/>
          </Route>

          <Route path="/manageproduct">
            <ManageProductPage/>
          </Route>

          <Route path="/userorder">
            <UserOrderPage/>
          </Route>

          <Route path="/about">
            <p>
              <div>
                <p>Nothing</p>
              </div>
            </p>
          </Route>
          <Route path="/">
            <LandingPage/>
          </Route>
        </Switch>
        <Footer/>
      </Router>

    </CartProvider>
  );
}

export default App;
