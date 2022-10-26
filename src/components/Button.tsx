function Button({
    onClick,
    text,
    color = '#00254d',
    icon = null,
}) {
  return (
    <button
    className='hover:cursor-pointer flex items-center border-[#00254d] border-[1.2px] rounded-md p-1 text-[00254d] hover:border-b-[3px] border-b-[#00162e] transition-all duration-200'
    onClick={onClick}
    style={{
      borderColor:color,
      color:color
    }}
  >

    {/* if component button included an icon -> display it */}
    {
        icon?
        <div
            className='mx-1'
        >
          {icon}
        </div>:null
        
    }

    {text}
  </button>
  )
}

export default Button