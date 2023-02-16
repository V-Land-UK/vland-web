import { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AdUnit() {
  const [extAdContainer,setExtAdContainer] = useState(false);
 
  
 
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={`${extAdContainer ? "hidden":"fixed"} bottom-0 left-0 z-999 border-box py-2 w-full border-t-[2px] border-t-[#c9c9c9] bg-white/[.65]` }>
      <div className={`flex w-full text-end`}>
          
        <div className="w-fit text-center mx-auto ">
            <ins
              //className="adsbygoogle block mx-auto w-[300px]  lg:w-[728px] h-[50px] lg:h-[90px]"
              className="adsbygoogle mx-auto w-[300px]  lg:w-[728px] h-[50px] lg:h-[90px]"
              style={{ display: "block" }}
              data-ad-client="ca-pub-9166716457553506"
              data-ad-slot="6593416244"
              data-ad-format="rectangle horizontal"
              data-full-width-responsive="true"
            ></ins>
        </div>
        
        <button className="absolute right-0 w-[24px] h-[24px] rounded-[50%] border-[1.25px] border-[#c9c9c9] mr-[2%] text-center" onClick={()=>{setExtAdContainer(true)}}>
              <FontAwesomeIcon icon={faXmark} className="w-[16px] h-[16px] m-auto"></FontAwesomeIcon>

        </button>
          
        
      </div>
    </div>
    
      
    
  );
}

export default AdUnit;
