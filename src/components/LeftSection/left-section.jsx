import './left-section.css'
import Button from "../Button/button.jsx";
const LeftSection = () => {
    return (
        <section className='left-section'>
            <p>Have you seen someone from the list?</p>
            <Button text='Refresh list' />
        </section>
    )
}
export default LeftSection