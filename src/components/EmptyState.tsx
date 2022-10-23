import { AiFillExclamationCircle } from 'react-icons/ai'

function EmptyState({text,error = false}) {
  return (
    <div 
      className={
        error?
        'text-red-500 flex items-center text-4xl font-bold mt-20':
        'text-gray-400 flex items-center text-4xl font-bold mt-20'
      }
    >
      <AiFillExclamationCircle className='mt-1 mx-4' size={46}/>
      {text}
    </div>
  )
}

export default EmptyState