import './wanted-page.css'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import MostWanted from "../MostWanteds/MostWanted/most-wanted.jsx";
import Blur from "../Loader/Blur/blur.jsx";
import Loader from "../Loader/loader.jsx";
const WantedPage = () => {
    const {slug} = useParams()
    const [mwInfo, setMwInfo] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(`https://api.fbi.gov/wanted/v1/list?title=${slug}`)
                const json = await data.json()
                console.log(json)
                setMwInfo(json.items)
            }catch (err){
                console.log(err)
            }

        })()
    }, []);

    return (
        <div className='main-page wanted-page'>
            {!mwInfo ? <Blur><Loader/></Blur> : <ul className='most-wanted-list-ul'>
                {mwInfo.map((item, index) => {
                    return <MostWanted type='single' data={item} index={index}/>
                })
                }
            </ul>}

        </div>
    )
}
export default WantedPage