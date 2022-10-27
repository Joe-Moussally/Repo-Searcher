import {useState, useEffect} from 'react'

import { updateArray,clearArray, getRepos } from '../features/resultSlice';
import { useDispatch,useSelector } from 'react-redux';
import { getSearch, updateSearch } from '../features/searchSlice';

import EmptyState from '../components/EmptyState'
import SearchBar from '../components/SearchBar'
import RepoCard from '../components/RepoCard';
import Loading from '../components/Loading';

import axios from 'axios';



//search page count
let page = 0;

//function to update search history in local storage
const updateHistory = (searchValue) => {

  //if search is empty string -> return
  if(searchValue === '') return

  //get history array from local storage
  let historyArray:any
  historyArray = JSON.parse(localStorage.getItem('history'))

  // if history array is not an array -> create new array
  if(!Array.isArray(historyArray)) {
    localStorage.removeItem('history')
    historyArray = []
  }

  //append new search to array
  historyArray.push(searchValue)

  //update local data
  localStorage.setItem('history',JSON.stringify(historyArray))
}



function HomeScreem() {

  const dispatch = useDispatch();

  //search input
  const searchInput = useSelector(getSearch);

  //response array stored in redux store
  const reposArray = useSelector(getRepos);

  //track the number of results
  const [resultsNumber,setResultsNumber] = useState(0)

  //tracking is api request is still in progress
  const [isLoading,setIsLoading] = useState(false);

  //error message text
  const [errorMessage,setErrorMessage] = useState('');

  const [searchResultObject,setSearchResultObject] = useState({
    resultsNumber:0,
    isLoading:false,
    errorMessage:''
  })

  //function that formats a number to string format for visualization
  //ex: 6012554 -> 6,012,554
  const formatNumber = (number) => {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // function to clear search in redux store
  const clearSearch = () => {
    dispatch(updateSearch(''))
  }

  //function to clear the repos array in redux store
  const clearReposArray = () => {
    dispatch(clearArray())
  }

  //function that calls fetchData on end scroll
  const fetchOnEnd = () => {
    console.log("HERE")
    //if scroll position reaches the end
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
      // on end list reach -> increase page count and call fetch        
      fetchData()
    }
  }

  //function to call the api
  const fetchData = () => {

    //reset error message on data fetch
    setErrorMessage('')
  
    //if search is empty
    if(searchInput === '') return

    //isLoading true -> display loading animation
    setIsLoading(true)

    //fetching data
    axios({
      url:'https://api.github.com/search/repositories',
      data:{
        'q':searchInput,
        'per_page':20,
        'page':page+1
      }
    }).then(response => {
      //update result array in redux store
      dispatch(updateArray(response.data.items))
      //update the results number
      setResultsNumber(formatNumber(response.data.total_count))
      //end loading animation
      setIsLoading(false)

      setSearchResultObject({
        resultsNumber:formatNumber(response.data.total_count),
        isLoading:false,
        errorMessage:''
      })

      //on success -> prepare for next page
      page += 1

    }).catch((err) => {
      //stop loading animation
      setIsLoading(false)

      if(err.response.status === 400 || err.response.status === 429) {
        //display error message
        setErrorMessage('Try Again Later')
      }
    })
  }

  // ------------- useEffect -------------
  useEffect(() => {
    // on first render  -> clear search input
    clearSearch()
    clearReposArray()

  },[])
  
  useEffect(() => {

    //clear repo array in store
    dispatch(clearArray())

    //when search input changes -> fetch data
    fetchData()

    //when search input changes -> udpate the search history
    updateHistory(searchInput)

    window.addEventListener('scroll',fetchOnEnd)

    //cleanup function
    return () => {
      window.removeEventListener('scroll',fetchOnEnd)
    }

  },[searchInput])
  // -----------------------------------

  return (
    <div className='flex flex-col items-center'>

      <SearchBar />

      {
        (reposArray.length === 0)?
        <>
          {
            (isLoading && searchInput)?
            <Loading />:
            <EmptyState
              text={
                // if error message available -> display error
                errorMessage?errorMessage:

                !searchInput?
                'Type in the search bar':
                'No Repos Found'
              }
            />
          }
        </>:
        <div className='flex flex-col'>
          {/* search result number */}
          <span
           className='self-center -translate-y-40 text-sm text-gray-400' 
          >{resultsNumber} repos found</span>

          {/* repo cards container */}
          <div
            className='flex flex-wrap justify-center gap-2 pb-20'
          >

            {
              reposArray.map((item) => 
                 (
                  <RepoCard
                    key={item.id}
                    id={item.id}
                    repoName={item.full_name}
                    description={item.description}
                    avatarUrl={item.owner.avatar_url}
                    forkCount={formatNumber(item.forks_count)}
                    ownerName={item.owner.login}
                    repoUrl={item.html_url}
                    starCount={formatNumber(item.stargazers_count)}
                    watcherCount={formatNumber(item.watchers_count)}
                  />
                )
              )
            }
          </div>
        </div>
      }

      {
        (isLoading && page>0)?
        <Loading />:null
      }

    </div>
  )
}

export default HomeScreem