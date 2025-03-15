import './header.css'
import {Link} from "react-router";
import logo from '../../assets/FBI logo.png'
const Header = () => {
    return (
        <section className='header'>
            <div className="header-inner-left">
                <img className='logo' src={logo} alt=""/>
            </div>
            <div className="header-inner">
                <Link to='/'><h1>CatchIt</h1></Link>
                <p>FBI Most Wanted</p>
            </div>
        </section>
    )
}
export default Header