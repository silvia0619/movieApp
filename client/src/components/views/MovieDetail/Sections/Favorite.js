import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Favorite(props) {

    const movieId= props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    
    let variables = {
                userFrom: userFrom,
                movieId: movieId,
                movieTitle: movieTitle,
                moviePost: moviePost,
                movieRunTime: movieRunTime
            }
        
    useEffect(() => {

       
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {

                console.log("*******************", response.data)
                setFavoriteNumber(response.data.favoriteNumber)
            
                if(response.data.success) {
                    
                } else {
                    alert('숫자 정보를 가져오는데 실패 하였다!')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {

                if(response.data.success) {
                    setFavorited(response.data.favorited)
                    console.log('favorited', response.data)
                } else {
                    alert('정보를 가져오는데 실패 하였다!')
                }
            })
    }, [])

    const onClickFavorite = () => {
        
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then((response) => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else{
                        alert("Faile to remove from the favorite list!")
                    }
                })

        }else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else{
                        alert("Faile to add to the favorite list!")
                    }
                })
        }
    }
    
    return (
        <div>
            <button onClick= {onClickFavorite} style={{ height: '50px', width: '50px' }}> {Favorited ? "❤" :  '♡'} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
