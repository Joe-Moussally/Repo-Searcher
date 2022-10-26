import React, {useState, useEffect} from 'react'
import EmptyState from '../components/EmptyState'
import SearchBar from '../components/SearchBar'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { updateArray,clearArray, getRepos } from '../features/resultSlice';
import { getSearch } from '../features/searchSlice';
import RepoCard from '../components/RepoCard';
import { AiFillStar } from 'react-icons/ai' 
import Loading from '../components/Loading';

function HomeScreem() {

  const dispatch = useDispatch();

  //search input
  const searchInput = useSelector(getSearch);

  //search page count
  let page = 1;

  //response array stored in redux store
  const array = useSelector(getRepos);

  //track the number of results
  const [resultsNumber,setResultsNumber] = useState(0)

  //tracking is api request is still in progress
  const [isLoading,setIsLoading] = useState(false);

  //error message text
  const [errorMessage,setErrorMessage] = useState('');


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

  //function that formats a number to string format for visualization
  //ex: 6012554 -> 6,012,554
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //function to call the api
  const fetchData = () => {

    //reset error message on data fetch
    setErrorMessage('')

    //isLoading true -> display loading animation
    setIsLoading(true)

    //clear array in redux store and return
    dispatch(clearArray())
    //reset page count on search input change
    page = 1

    //if search is empty
    if(searchInput === '') return

    //set url parameter and call the api
    let baseUrl = "https://api.github.com/search/repositories?"

    //adding search query
    baseUrl+='q='+searchInput
    //adding per page result
    baseUrl+='&per_page=20'
    //adding page number
    baseUrl+='&page='+page

    //fetching data
    axios({
      url:baseUrl
    }).then(response => {
      //update result array in redux store
      dispatch(updateArray(response.data.items))
      //update the results number
      setResultsNumber(formatNumber(response.data.total_count))
      //end loading animation
      setIsLoading(false)
    })
  }

  //function that is called when the user reaches the end of the list
  const fetchMoreData = () => {
    //increment page count
    page += 1

    //set url parameter and call the api
    let baseUrl = "https://api.github.com/search/repositories?"

    //adding search query
    baseUrl+='q='+searchInput
    //adding per page result
    baseUrl+='&per_page=20'
    //adding page number
    baseUrl+='&page='+page

    //fetching data
    axios({
      url:baseUrl
    }).then(response => {
      //update result array in redux store
      dispatch(updateArray(response.data.items))
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
  //when search input changes -> fetch data
  useEffect(() => {
    fetchData()

    //when search input changes -> udpate the search history
    updateHistory(searchInput)

    // adding on scroll event for new search input
    window.onscroll = () => {
      //if scroll position reaches the end
      if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
        // on end list reach -> increase page count and call fetch        
        fetchMoreData()
      }
    }

    //cleanup function
    return () => {

    }

  },[searchInput])
  // -----------------------------------

  return (
    <div className='flex flex-col items-center'>

      <SearchBar />

      {/* <Loading /> */}

      {
        (array.length === 0)?
        <>
          {
            (searchInput === '')?
            //if repos array is empty and search input is empty
            <EmptyState text='Type in the search bar'/>:
              //if api is still fetching -> display loading animation
              (isLoading)?
              <Loading />:
                !(errorMessage === '')?
                //if error message changed -> display error message
                <EmptyState error={true} text={errorMessage}/>:
                //if repos array is empty and search not empty
                <EmptyState text='No Repos Found'/>
          }
        </>:
        <div className='flex flex-col'>
          {/* search result number */}
          <span
           className='self-center -translate-y-20 text-sm text-gray-400' 
          >{resultsNumber} repos found</span>

          {/* repo cards container */}
          <div
            className='flex flex-wrap justify-center gap-2 pb-20'
          >

            {
              array.map((item) => {
                return (
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
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default HomeScreem