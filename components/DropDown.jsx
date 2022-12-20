import {useEffect,useState} from "react";




const DropDown = ({title, children})=>
{
   
    const [active, setActive] = useState(false);
    const [scroll,setScroll] = useState(0);
    
    const toggleActive = ()=>{
      
        active ? setActive(false): setActive(true);
        
        
    }
    
    return(
        <div className="mb-2">
            <div className="relative font-semibold h-[50px] bg-primary text-white w-[100%] align-center border-box py-[10px] cursor-pointer" onClick={()=>{toggleActive()}}>
                <a className={`text-md w-[80%] inline-block align-middle ml-[3%] xs:mr-[4%] sm:mr-[6%] md:mr-[8%] ${active ? "underline":""}`}>{title}</a>
                <button className={`border-white h-[6px] border-x-[11px] border-y-[6px] w-0 border-y-transparent border-l-transparent align-middle origin-[75%_50%] ${active ? "rotate-[-90deg]": ""}`} ></button>
            </div>
            {active && (<div className={`w-[90%] m-auto`}>{children}</div>)}
        </div>

    );
};

export default DropDown;