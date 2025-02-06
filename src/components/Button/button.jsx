import './button.css'
const Button = ({text, url}) => {
    return (
        <a href={url} className='custom-button'>
            {text}
        </a>
    )
}
export default Button