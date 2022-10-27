function Button({
    onClick,
    text = '',
    color = '#00254d',
    icon = null,
    filled = false,
    ...rest
}) {
  return (
    <button
    className='bg-white hover:cursor-pointer flex items-center border-[#00254d] border-[1.2px] rounded-md p-1 text-[00254d] hover:border-b-[3px] border-b-[#00162e] transition-all duration-200'
    onClick={onClick}
    style={{
      borderColor:color,
      color:filled?'white':color,
      backgroundColor:filled?color:'white',
      ...rest.styles      
    }}
  >

    {/* if component button included an icon -> display it */}
    {
        icon?
        <div>
          {icon}
        </div>:null
        
    }

    {/* Button text */}
    <div className={text?'mx-1':null}>
      {text?text:null}
    </div>

  </button>
  )
}

export default Button