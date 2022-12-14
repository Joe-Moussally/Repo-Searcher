import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { getFavorites } from '../features/favoritesSlice'

import EmptyState from '../components/EmptyState'
import RepoCard from '../components/RepoCard'

import { BiArrowBack } from 'react-icons/bi'
import { useEffect } from 'react'


function FavoritesScreen() {

  const navigate = useNavigate();

  const favoritesArray = JSON.parse(localStorage.getItem('favorites'))

  return (
    <div>

      {/* Back button */}
      <div
        className='p-10 flex items-center text-4xl gap-5 text-gray-500 hover:cursor-pointer hover:underline'
        onClick={() => navigate('/')}
      >
        <BiArrowBack
          className='mt-1'
        />
        Home
      </div>

      {/* Favorite repo containers */}
      <div
        className='flex flex-wrap gap-2 m-2 justify-center'
      >
        {
          (favoritesArray.length === 0)?
          <EmptyState text='No Favorite Repos'/>:
          favoritesArray.map(item => (
            <RepoCard
              key={item.id}
              id={item.id}
              repoName={item.repoName}
              description={item.description}
              avatarUrl={item.avatarUrl}
              forkCount={item.forksCount}
              ownerName={item.ownerName}
              repoUrl={item.repoUrl}
              starCount={item.starCount}
              watcherCount={item.watcherCount}
            />
          ))
        }
      </div>
    </div>
  )
}

export default FavoritesScreen