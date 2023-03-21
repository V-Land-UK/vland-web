import { invalid } from "moment";
import { Fragment, useEffect, useState } from "react"
import Layout from "../defaults/Layout"



const Donate = ()=>
{
    const [singleActive, setSingleActive] = useState(true);
    const [activePrice, setActivePrice] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [selectionPrice, setSelectionPrice] = useState("");
    const [Email, setEmail] = useState("");
    const [index, setIndex] = useState(0);
    const emotions_list = ["inspired", "happy", "empowered", "excited", "informed" ]; 

    useEffect(()=>{
        const interval = setInterval(()=>{
            const temp_index = index + 1;
            const intial_transformation =  temp_index % emotions_list.length;
            setIndex(intial_transformation ? emotions_list.length - intial_transformation: intial_transformation);
        },2000);

        return ()=> clearInterval(interval);
    },[]);

    const handleInput = (e)=>{
        if(e.target.validity.valid){
            if(e.target.value ==="."){
                return setInputValue("0.");
            }
            else{
                return setInputValue(e.target.value);
            }
        }
        return inputValue;
    }
    
    const toggleSingleActive = ()=>{
        setSingleActive(prev => prev ? false:true);
    }
    useEffect(()=>{
        if(singleActive){
            switch(activePrice){
                case 1:
                    setSelectionPrice(25);
                    break;
                case 2:
                    setSelectionPrice(50);
                    break;
                case 3:
                    setSelectionPrice(100);
                    break;
                default:
                    break;
            }
        }
        else{
            switch(activePrice){
                case 1:
                    setSelectionPrice(5);
                    break;
                case 2:
                    setSelectionPrice(10);
                    break;
                case 3:
                    setSelectionPrice(20);
                    break;
                default:
                    break;
            }

        }
    }, [singleActive]);
    useEffect(()=>{
        activePrice && setInputValue("");
    }, [activePrice]);
    useEffect(()=>{
        inputValue?.split("")?.length && setActivePrice(0)
    },[inputValue]);

    const toggleActivePrice = (idx, val)=>{
        setActivePrice(idx);
        setSelectionPrice(val);
    }
    
    return (
        <Layout
            title = "Support us"
            desc="support the V-Land team and keep us creating and curating vegan content for you with a donation of any amount."
        >
            <div className="w-full text-center">
                <h1 className=" text-[3.052rem] font-bold">Support us</h1>
                <h2 className="text-[1.953rem] font-semiBold mt-5">If our content made you</h2>
            </div>
            <div className="relative mx-auto w-[80%] rounded-[12px] md:w-[450px] border-box mt-5 pt-12 pb-4 bg-[#44b882] text-center">
                <form method="POST" action="/checkout" className="relative w-[80%] mx-auto text-white">
                    <div className="rounded-[12px] w-[90%] mx-auto">
                        <button type="button" className={`${singleActive ? "bg-primary border-r-[1.2px]":""} w-[50%] border-box py-4 border-white border-t-[1.2px] border-l-[1.2px] border-b-[1.2px] rounded-tl-[12px] rounded-bl-[12px]`} onClick={()=>{toggleSingleActive()}}>Single</button>
                        <button type="button" className={`${singleActive ? "":"bg-primary border-l-[1.2px]"} w-[50%] border-box py-4 border-white border-t-[1.2px] border-r-[1.2px] border-b-[1.2px] rounded-tr-[12px] rounded-br-[12px]`} onClick={()=>{toggleSingleActive()}}>Monthly</button>
                    </div>
                    <h3 className="mt-3 mx-auto">Choose an amount to donate</h3>
                    <div className="mt-3 w-[80%] mx-auto grid grid-cols-5">
                        {singleActive ? (
                            <Fragment>
                                <button type="button" className={`${activePrice/1 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(1,25)}}>£25</button>
                                <button type="button" className={`${activePrice/2 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} col-start-3  border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(2,50)}}>£50</button>
                                <button type="button" className={`${activePrice/3 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} col-start-5 border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(3,100)}}>£100</button>
                            </Fragment>
                        ):(
                            <Fragment>
                                <button type="button" className={`${activePrice/1 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(1,5)}}>£5</button>
                                <button type="button" className={`${activePrice/2 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} col-start-3  border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(2,10)}}>£10</button>
                                <button type="button" className={`${activePrice/3 === 1 && inputValue?.split('')?.length < 1 ? "bg-primary": ""} col-start-5 border-box border-white rounded-[6px] border-[1.2px] py-3 cursor-pointer`} onClick={()=>{toggleActivePrice(3,20)}}>£20</button>
                            </Fragment>
                        )}
                    </div>
                    {singleActive && (
                        <div className="relative mt-3 w-[80%] mx-auto bg-[#49c488] border-box py-3 rounded-[6px]">
                            <div className="inline-block w-[10%]">£</div>
                            <input type="text" pattern="\d*(\.?\d{0,2})?" className="w-[90%] mx-auto bg-[#49c488] outline-none focus:outline-none" value={inputValue} onChange={e => handleInput(e)}/>
                        </div>
                    )}
                    {singleActive || (
                       
                        <div className="relative mt-3 w-[80%] mx-auto bg-[#49c488] border-box py-3 rounded-[6px]">
                        
                            <input type="email" placeholder="Email address"
                                value={Email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[90%] mx-auto bg-[#49c488] placeholder-white/60 outline-none focus:outline-none" 
                                required
                                
                            />

                        </div>
                           
                      
                        

                    )}
                    {(activePrice || inputValue?.split('').length) ? (
                        
                        <button className={`bg-primary mt-3 rounded-[12px] border-white border-[1.2px] w-[80%] mx-auto border-box py-4`}>Support</button>
                        
                    ):(
                        <button className={`mt-3 rounded-[12px] border-white border-[1.2px] w-[80%] mx-auto border-box py-4`} disabled>Support</button>


                    )}
                    <input type="hidden" name="amount" value={`${activePrice ? selectionPrice:inputValue}`}/>
                    <input type="hidden" name="frequency" value={`${singleActive ? "single":"monthly"}`}/>
                </form>
            </div>
        </Layout>

        
    )
}


export default Donate;