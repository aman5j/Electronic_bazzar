import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import Home from "./components/userInterface/screens/Home";
import HomeDashboard from "./components/userInterface/screens/HomeDashboard";
import CompareProducts from "./components/userInterface/screens/CompareProducts";
import SpecificationProduct from "./components/userInterface/screens/SpecificationProduct";
import YourCart from "./components/userInterface/screens/YourCart";
import ProductPurchaseScreen from "./components/userInterface/screens/ProductPurchaseScreen";
import Cart from "./components/userInterface/screens/Cart";
import OtpComponent from "./components/userInterface/users/OtpComponent";
import Shopping from "./components/userInterface/screens/Shopping";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<AdminLogin/>} path="/adminlogin"/>
          <Route element={<Dashboard/>} path="/dashboard/*"/>
          <Route element={<Home/>} path="/home"/>
          {/* <Route element={<HomeDashboard/>} path="/homedashboard"/>
          <Route element={<CompareProducts/>} path="/compareproducts"/>
          <Route element={<SpecificationProduct/>} path="/specificationproduct"/>
          <Route element={<YourCart/>} path="/yourcart"/> */}
          <Route element={<ProductPurchaseScreen/>} path="/productpurchasescreen" />
          <Route element={<Cart/>} path="/cart" />
          <Route element={<OtpComponent/>} path="/otp" />
          <Route element={<Shopping/>} path="/useraccount" />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
