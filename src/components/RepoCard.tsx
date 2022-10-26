import { useState, useEffect } from 'react'

import AddToFavoritesButton from './AddToFavoritesButton'
import Button from './Button'

import { toggleFavorite, getFavorites } from '../features/favoritesSlice'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillStar, AiFillEye } from 'react-icons/ai'
import { BiGitRepoForked } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'

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
  const [isFavorite,setIsFavorite] = useState(false)

  //get the favorites repos array from redux
  const favoriteRepos = useSelector(getFavorites)

  //function that adds the current repo to the favorites array in redux store
  const toggleFavoriteInStore = () => {
    dispatch(toggleFavorite({
      id,
      repoName,
      description,
      ownerName:ownerName,
      avatarUrl:avatarUrl,
      forkCount:forkCount,
      starCount:starCount,
      watcherCount:watcherCount,
      repoUrl:repoUrl
    }))
    // toggle isFavorite true/false
    setIsFavorite(prevFav => !prevFav)
  }

  //function to check if the repo is in the favorites
  const checkFavorites = () => {
    let repoIndex = favoriteRepos.findIndex(repo => repo.id === id);
    if(repoIndex !== -1) setIsFavorite(true)
  }

  useEffect(() => {
    checkFavorites()
  },[])

  return (

    // Repo card div
    <div 
      className='w-[370px] shadow-sm rounded-md p-3 flex flex-col justify-between'  
    >

      {/* Repo header container -> avatar + repo name */}
      <div className='flex items-center justify-start'>
        <img
          alt='avatar'
          src={avatarUrl}
          className='border-2 w-[40px] h-[40px] rounded-full m-2'
        />
        <div className='w- text-xl font-bold'>{repoName}</div>
      </div>
      
      {/* repo description */}
      <div className='text-gray-400 text-sm'>{description}</div>

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

        {/* Visit repo button */}
        <Button
          text='Vitist Repo'
          onClick={() => {window.open(repoUrl,'_blank')}}
          icon={<FiExternalLink />}
        />

        {/* Add to favorites button */}
        <AddToFavoritesButton
          onClick={toggleFavoriteInStore}
          filled={isFavorite}
        />

      </div>
  </div>
  )
}

export default RepoCard