import './most-wanted-single.css'
import pobSVG from '../../assets/Birth_place.svg'
import nationalitySVG from '../../assets/Nationality.svg'
import genderSVG from '../../assets/GenderSVG.svg'
import aliasSVG from '../../assets/Alias.svg'
import weightSVG from '../../assets/WeightSVG.svg'
const MostWantedSingle = ({data}) => {
    const {images, sex, weight, title, nationality, description, aliases, caution, date_of_birth_used, place_of_birth} = data
    const {large} = images[0]
    return (
        <section className='most-wanted-single'>
            <section className="most-wanted-single-top">
                <div className="most-wanted-header">
                    <img className='most-wanted-single-image' src={large} alt=""/>

                </div>
                <div className='most-wanted-single-right'>
                    <h1>{title}</h1>
                    <div className='most-wanted-single-cards'>
                        {aliases && <div className="pob svg-info">
                            <img className='svg-icon' src={aliasSVG} alt=""/>
                            {aliases.map((alias, index) => {
                                if (index < 2) return <p className='svg-info-main' key={index}>{alias}</p>
                            })}
                            <p className='svg-info-metric'>Aliases</p>
                        </div>
                        }
                        {date_of_birth_used && date_of_birth_used.map((dob, index) => <p key={index}>{dob}</p>)}
                        {place_of_birth && <div className="pob svg-info">
                            <img className='svg-icon' src={pobSVG} alt=""/>
                            <><p className='svg-info-main'>{place_of_birth}</p> <p className='svg-info-metric'>Place of
                                Birth</p></>
                        </div>}
                        {nationality && <div className="pob svg-info">
                            <img className='svg-icon' src={nationalitySVG} alt=""/>
                            <><p className='svg-info-main'>{nationality}</p> <p
                                className='svg-info-metric'>Nationality</p></>
                        </div>}
                        {weight && <div className="pob svg-info">
                            <img className='svg-icon' src={weightSVG} alt=""/>
                            <><p className='svg-info-main'>{weight}</p> <p
                                className='svg-info-metric'>Weight</p></>
                        </div>}
                        {sex && <div className="pob svg-info">
                            <img className='svg-icon' src={genderSVG} alt=""/>
                            <><p className='svg-info-main'>{sex}</p> <p className='svg-info-metric'>Gender</p></>
                        </div>}
                    </div>



                </div>
            </section>

            <div className="most-wanted-content">
                <p dangerouslySetInnerHTML={{__html: caution}}></p>
            </div>
        </section>
    )
}
export default MostWantedSingle