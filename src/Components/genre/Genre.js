import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

const Genre = ({data}) => {

 const {genres} = useSelector((state) => state.home)
  return (
    <div className='genres'>
        {data?.map((id)=>{
            return(
                <div className="genre">
                    {genres[id]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genre