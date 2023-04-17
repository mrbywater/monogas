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

function App() {

  return (
      <>
        <Header/>
        <Routes >
          <Route path="/" element={<Home />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/works" element={<OurProjects />}/>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/services/:path" element={<SpecificService />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
        <Footer/>
      </>
  );
}

export default App;
