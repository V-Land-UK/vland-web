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
 
     
    <div className={`adsContainer ${extAdContainer ? "hidden":"fixed"} bottom-0 left-0 z-999 border-box py-2 w-full border-t-[2px] border-t-[#c9c9c9] bg-white/[.65]` }>
      <div className={`flex w-full text-end`}>
        <div className="hidden extContainer w-[30px] h-[30px] rounded-tl-[4px] border-[#c9c9c9] border-l-[2px] border-t-[2px] bg-white absolute top-[-30px] right-0 text-center">
          <button className="w-[20px] h-[20px] rounded-[50%] border-[1.25px] border-[#c9c9c9] text-center" onClick={()=>{setExtAdContainer(true)}}>
                <FontAwesomeIcon icon={faXmark} className="w-[12px] h-[12px] m-auto"></FontAwesomeIcon>

          </button>
        </div>
          
        <div className="w-fit text-center mx-auto">
            <ins
              //className="adsbygoogle block mx-auto w-[300px]  lg:w-[728px] h-[50px] lg:h-[90px]"
              className="adsbygoogle mx-auto w-[320px] h-[50px] lg:h-[90px] lg:w-[728px]"
              style={{ display: "block"}}
              data-ad-client="ca-pub-9166716457553506"
              data-ad-slot="6593416244"
              data-ad-format="rectangle horizontal"
              data-full-width-responsive="false"
            ></ins>
        </div>
        
        <button className="extAd inline-block absolute right-0 w-[24px] h-[24px] rounded-[50%] border-[1.25px] border-[#c9c9c9] mr-[2%] text-center" onClick={()=>{setExtAdContainer(true)}}>
              <FontAwesomeIcon icon={faXmark} className="w-[16px] h-[16px] m-auto"></FontAwesomeIcon>

        </button>
          
        
      </div>
    </div>
    
    
      
    
  );
}

export default AdUnit;
