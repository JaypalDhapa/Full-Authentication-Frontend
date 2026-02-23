function SocialButton({icon,text,onClick}){
    return(
        <button 
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 mb-3 hover:bg-gray-100 transition font-medium"

        >
            <img src={icon} alt={text} className="w-7 h-7" />
            {text}
        </button>
    )
}

export default SocialButton;