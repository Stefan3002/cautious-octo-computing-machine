import './most-wanted.css'
const MostWanted = ({data, index}) => {
    const {title, description} = data

    return (
        <li key={index}>
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    )
}
export default MostWanted