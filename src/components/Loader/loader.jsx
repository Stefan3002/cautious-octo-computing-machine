import './loader.css'
import LoadingSVG from '../../assets/Loader_SVG.svg'
const Loader = () => {
    return (
        <div className='loader'>
            <img src={LoadingSVG} alt="Loading"/>
        </div>
    )
}
export default Loader