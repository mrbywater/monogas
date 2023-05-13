import './App.scss';
import {Header} from './Components/Header/Header.js';
import {Footer} from './Components/Footer/Footer.js';

import {Routes, Route} from 'react-router-dom'

import {Home} from "./Components/Content/Home";
import {AboutUs} from "./Components/Content/AboutUs";
import {OurProjects} from "./Components/Content/OurProjects";
import {Services} from "./Components/Content/Services";
import {NotFoundPage} from "./Components/Content/NotFoundPage";
import {SpecificService} from "./Components/Content/SpecificService";
import {SelectedProject} from "./Components/Content/SelectedProject"
import {Shop} from "./Components/Content/Shop"
import {ShopItem} from "./Components/Content/ShopItem"
import {ShoppingCartProvider} from "./Components/Context/ShoppingCartContext"
import {Order} from "./Components/Content/Order";

function App() {

  return (
    <ShoppingCartProvider>
        <Header/>
        <Routes >
            <Route path="/" element={<Home />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/works" element={<OurProjects />}/>
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/services/:path" element={<SpecificService />}/>
            <Route path="/works/:url" element={<SelectedProject />}/>
            <Route path="/shop/:item" element={<ShopItem />}/>
            <Route path="/order" element={<Order />}/>
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <Footer/>
    </ShoppingCartProvider>
  );
}

export default App;
