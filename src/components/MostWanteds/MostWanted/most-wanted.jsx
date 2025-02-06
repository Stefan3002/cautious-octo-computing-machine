import './most-wanted.css'
import Button from "../../Button/button.jsx";
const MostWanted = ({data, index, type='multiple'}) => {
    const {title, description, images, uid} = data
    const {large, caption} = images[0]
    return (
        <li style={{background: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)), URL(${large})`}} className='most-wanted' key={index}>
            {/*<p>{caption}</p>*/}
            {/*<img className='wanted-image' src={large} alt={caption}/>*/}
            <h3>{title}</h3>
            <p>{description.slice(0, 100)} {description.length > 100 && '...'}</p>
            <Button text='More info' url={`/wanted/${type === 'multiple' ? title : `${title}/${uid}`}`} />
        </li>
    )
}
export default MostWanted