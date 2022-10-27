import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { updateSearch } from '../features/searchSlice';

import styles from '../style_modules/SearchBar.module.css';

import { AiFillStar } from 'react-icons/ai'

import Button from './Button';


let timer

function SearchBar() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //function that is called on search text change
  const handleSearch = (searchValue) => {
    //debounce effect
    clearTimeout(timer)
    timer = setTimeout(() => {
      //update search input value
      dispatch(updateSearch(searchValue))
    },600)
  }


  return (
    <>
      {/* searbar input */}
      <input
        placeholder='Search Repositories...'
        className={styles.searchbar}
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />

      {/* see favorite repos button */}
      <Button
        onClick={() => navigate('/favorites')}
        icon={<AiFillStar />}
        text='Favorite Repos'
        color='#c2a500'
      />
    </>
  )
}

export default SearchBar