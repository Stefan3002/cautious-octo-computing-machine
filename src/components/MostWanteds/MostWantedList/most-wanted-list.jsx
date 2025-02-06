import './most-wanted-list.css'
import {useEffect, useState} from "react";
import MostWanted from "../MostWanted/most-wanted.jsx";
import Loader from "../../Loader/loader.jsx";
import Blur from "../../Loader/Blur/blur.jsx";
const MostWantedList = () => {
    const [mwlist, setMwList] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await fetch('https://api.fbi.gov/wanted/v1/list')
                const json = await data.json()
                console.log(json)
                setMwList(json.items)
            }catch (err){
                console.log(err)
            }

        })()
    }, []);

    return (
        <div className='most-wanted-list'>
            {/*<h2>Most Wanted List</h2>*/}
            {mwlist.length === 0 ? <Blur><Loader /></Blur> : <ul className='most-wanted-list-ul'>
                {mwlist.map((item, index) => {
                    return <MostWanted type='simple' data={item} index={index}/>
                })
                }
            </ul>
            }

        </div>
    )
}
export default MostWantedList