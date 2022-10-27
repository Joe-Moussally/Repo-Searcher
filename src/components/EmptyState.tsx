import { AiFillExclamationCircle } from 'react-icons/ai'

function EmptyState({text,error = false}) {
  return (
    <div 
      className={
        ' flex items-center text-4xl font-bold mt-20'+
        (error)?
        'text-red-500':
        'text-gray-400'
      }
    >
      <AiFillExclamationCircle className='mt-1 mx-4' size={46}/>
      {text}
    </div>
  )
}

export default EmptyState