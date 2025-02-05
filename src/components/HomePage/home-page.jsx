import './home-page.css'
import Header from "../Header/header.jsx";
import RightSection from "../RightSection/right-section.jsx";
const HomePage = () => {
    return (
        <section className='home-page'>
            <Header />
            {/*<LeftSection />*/}
            <RightSection />
            {/*<Footer />*/}
        </section>
    )
}
export default HomePage