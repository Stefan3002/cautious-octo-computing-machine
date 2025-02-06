import './wanted-page-single.css'
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import MostWanted from "../MostWanteds/MostWanted/most-wanted.jsx";
import Blur from "../Loader/Blur/blur.jsx";
import Loader from "../Loader/loader.jsx";
import MostWantedSingle from "../MostWantedSingle/most-wanted-single.jsx";
const WantedPageSingle = () => {
    const {slug, uuid} = useParams()
    const [mwInfo, setMwInfo] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch(`https://api.fbi.gov/wanted/v1/list?title=${slug}`)
                const json = await data.json()
                console.log(json)
                const wanted = json.items.filter(item => item.uid === uuid)
                if(wanted.length)
                    setMwInfo(wanted[0])
                else
                    throw new Error('Not found')
            }catch (err){
                console.log(err)
            }

        })()
    }, []);


    return (
        <section className='main-page wanted-page-single'>
            {!mwInfo ? <Blur><Loader /></Blur> : <MostWantedSingle data={mwInfo} />}
        </section>
    )
}
export default WantedPageSingle