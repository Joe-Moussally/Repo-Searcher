import { AiFillStar } from 'react-icons/ai'

function AddToFavoritesButton({onClick, filled}) {

  return (
    <button
        className={
        (filled)?
        'bg-[#d4b400] hover:cursor-pointer flex items-center border-[#d4b400] hover:border-[#ad7f00] border-[1.2px] rounded-md p-1 hover:border-b-[3px] transition-all duration-300':
        'bg-white hover:cursor-pointer flex items-center border-[#d4b400] border-[1.2px] rounded-md p-1 hover:border-b-[3px] transition-all duration-300'
      }
      onClick={onClick}
    >
    <AiFillStar
        className={
          (!filled)?
          'text-[#d4b400]':
          'text-white'
        }
    />
  </button>
  )
}

export default AddToFavoritesButton