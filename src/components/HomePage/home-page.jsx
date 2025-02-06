import './home-page.css'
import Header from "../Header/header.jsx";
import RightSection from "../RightSection/right-section.jsx";
import LeftSection from "../LeftSection/left-section.jsx";
import {Outlet} from "react-router";
const HomePage = () => {
    return (
        <section className='home-page'>
            <Header />
            <section className="home-page-main">
                <LeftSection />
                <Outlet />
            </section>

            {/*<Footer />*/}
        </section>
    )
}
export default HomePage