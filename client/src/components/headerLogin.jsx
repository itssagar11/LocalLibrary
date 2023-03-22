
const Header=(props)=>{
    const {heading,paragraph,src}=props

    return(
        <div className=" ">
            <div className=" mb-5 flex justify-center">
                <img
                alt=""
                className=" h-14 w-14"
                src={src}
                
                />
            </div>
            <h2 className="  text-center  text-gray-900 text-sm font-extrabold">{heading} </h2>
            <p className=" text-gray-600 text-sm">
                {paragraph}
            </p>



        </div>



    )
}

export default Header;