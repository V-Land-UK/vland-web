import {useEffect,useState} from "react";




const DropDown = ({title, className, children})=>
{
   
    const [active, setActive] = useState(false);
    const [scroll,setScroll] = useState(0);
    
    const toggleActive = ()=>{
      
        active ? setActive(false): setActive(true);
        
        
    }
    
    return(
        <div className="mb-2">
            <div className={className || "relative font-semibold h-[50px] text-white bg-primary text-md w-[100%] border-white align-center border-box py-[10px] cursor-pointer"} onClick={()=>{toggleActive()}}>
                <a className={`w-[80%] inline-block align-middle ml-[3%] xs:mr-[4%] sm:mr-[6%] md:mr-[8%] ${active ? "underline":""}`}>{title}</a>
                <button className={`h-[6px] border-current border-x-[11px] border-y-[6px] w-0 border-y-transparent border-l-transparent align-middle origin-[75%_50%] ${active ? "rotate-[-90deg]": ""}`} ></button>
            </div>
            {active && (<div className={`w-[90%] m-auto`}>{children}</div>)}
        </div>

    );
};

export default DropDown;