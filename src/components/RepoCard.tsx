import { useState } from 'react'

import Button from './Button'

import { toggleFavorite, getFavorites } from '../features/favoritesSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillStar, AiFillEye } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'

function RepoCard({
    id,
    repoName,
    description,
    ownerName,
    avatarUrl,
    forkCount,
    starCount,
    watcherCount,
    repoUrl
}) {

  const dispatch = useDispatch();

  //track if repo is favorited or no
  const [isFavorite,setIsFavorite] = useState(() => {
    //find the repo index in the local storage array
    let repoIndex = JSON.parse(localStorage.getItem('favorites')).findIndex(repo => repo.id === id)

    // if not found return false
    if(repoIndex === -1) return false
    else return true
  })

  //get the favorites repos array from redux
  const favoriteRepos = useSelector(getFavorites)

  //function that adds the current repo to the favorites array in redux store
  const toggleFavoriteInStore = (event) => {
    dispatch(toggleFavorite({
      id,
      repoName,
      description,
      ownerName,
      avatarUrl,
      forkCount,
      starCount,
      watcherCount,
      repoUrl
    }))
    // toggle isFavorite true/false
    setIsFavorite(prevFav => !prevFav)

    //toggle repo favorites in local storage
    let favoritesArray = JSON.parse(localStorage.getItem('favorites'))

    if(favoritesArray === null) favoritesArray = []

    //find if the repo is already in array
    let repoIndex = favoritesArray.findIndex(repo => repo.id === id)

    //if repo is not in array -> add it
    if(repoIndex === -1) {
      favoritesArray = [...favoritesArray,{
        id,
        repoName,
        description,
        ownerName,
        avatarUrl,
        forkCount,
        starCount,
        watcherCount,
        repoUrl
      }]
    } else {
      //remove repo from array
      favoritesArray = favoritesArray.filter(repo => repo.id !== id)
    }

    //save the array in the local storage
    localStorage.setItem('favorites',JSON.stringify(favoritesArray))

    event.stopPropagation()
  }

  //function to redirect to repo url
  const redirectToRepo = () => {
    window.open(repoUrl,'_blank')
  }
  

  return (

    // Repo card div
    <div 
      className='hover:scale-[1.04] hover:shadow-xl hover:cursor-pointer min-w-[270px] max-w-[370px] w-[40%] bg-white shadow-md rounded-md p-3 flex flex-col justify-between transition-all'
      onClick={redirectToRepo}
    >

      {/* Repo header container -> avatar + repo name */}
      <div className='flex items-center justify-start'>
        <img
          alt='avatar'
          src={avatarUrl}
          className='border-2 w-[40px] h-[40px] rounded-full m-2'
        />
        <div className='w- text-xl font-bold break-all'>{repoName}</div>
      </div>
      
      {/* repo description */}
      <div className='text-gray-400 text-sm break-all'>{description}</div>

      {/* Card footer -> repo stars and forks + add to favorites button */}
      <div
        className='flex justify-between mt-1 max-h-[50px]'
      >

        {/* repo forks+stars+watchers container */}
        <div className='flex  justify-start items-center gap-2'>
          {/* repo forks */}
          <div className='flex items-center'>
            <BiGitRepoForked /> {forkCount}
          </div>

          {/* repo stars */}
          <div className='flex items-center'>
            <AiFillStar /> {starCount}
          </div>

          {/* repo watchers */}
          <div className='flex items-center'>
            <AiFillEye /> {watcherCount}
          </div>
        </div>

        {/* Add to favorites button */}
        <Button
          onClick={(e) => toggleFavoriteInStore(e)}
          icon={<AiFillStar />}
          color='#d4b400'
          filled={isFavorite}
        />

      </div>
  </div>
  )
}

export default RepoCard