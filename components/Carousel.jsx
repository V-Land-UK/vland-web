import { GlobalContext } from "../context/GlobalContext";
import AnimatedLink from "./AnimatedLink";
import CarouselArticleCard from "./CarouselArticleCard";
import { useRef, useState, useContext, useEffect } from "react";
import { SITE_URL,API } from "../config/api";


const Carousel = ({
    cat,
    member
    

})=>
{
    
    const [hasMoreRight, setHasMoreRight] = useState(false);
    const [hasMoreLeft, setHasMoreLeft] = useState(false);
    const trackSize = useRef(null);
    const sliderRef = useRef(null);
    const initialWidthDifference = useRef(null);
    const [widthDifference,setWidthDifference] = useState(0);
    const containerRef = useRef(null);
    const [finalScrollVal, setFinalScrollVal] = useState(0);
    const [translateVar,setTranslateVar] = useState(0);
   
  

    
    useEffect(()=>{
        if(sliderRef.current && containerRef.current)
        {
            if(!initialWidthDifference.current)initialWidthDifference.current = sliderRef.current.clientWidth - containerRef.current.clientWidth;
            
            setWidthDifference(initialWidthDifference.current);
            
        }
    },[])

    useEffect(()=>{
        
        if(widthDifference > 0){
            
            setHasMoreRight(true);
            if(widthDifference < initialWidthDifference.current){
                
                setHasMoreLeft(true);

            }
            else{
                setHasMoreLeft(false)
            }

        }
        else{
            setHasMoreRight(false);

        }
        
        

    },[widthDifference]);

    useEffect(()=>{
        setWidthDifference((sliderRef.current.clientWidth + translateVar) - containerRef.current.clientWidth);
        
    },[translateVar])

    
   
    
    const handleRightScroll = ()=>{
        
        const minTranslateVar = Math.min(sliderRef.current.clientWidth/8, widthDifference);
        if(widthDifference < sliderRef.current.clientWidth/8) setFinalScrollVal(widthDifference);
        setTranslateVar(prev => prev - minTranslateVar);
        
       
      

    };

    const handleLeftScroll = ()=>{
        let minTranslateVar;
        if(finalScrollVal){
            
            minTranslateVar = finalScrollVal;
            setFinalScrollVal(0);

        }
        else{
            minTranslateVar = (sliderRef.current.clientWidth/8);
        }
        
        setTranslateVar(prev => prev + minTranslateVar);
        
        
    };

    return(
       
        <section className="carousel-ctnr relative w-full mt-8 border-box pl-3 py-3 bg-neutral-50 rounded-xl overflow-x-hidden" ref={containerRef}>
            <h2 className="font-bold inline-block text-[1.563rem] md:text-[1.953rem] tracking-[-0.0009em] ml-3">{cat?.attributes?.name}</h2>
            <AnimatedLink href={`${SITE_URL}/?author=${member?.attributes?.name}`}/>
            <div className={`grid grid-flow-col auto-cols-[12.125rem] md:auto-cols-[14.125rem] lg:auto-cols-[15.125rem] transition-transform duration-700 ease-linear mt-5 w-fit ml-3 gap-3`} style={{transform:`translateX(${translateVar}px)`}} ref={sliderRef}>
                {cat?.attributes?.articles?.data?.slice(0,9).map((article,index)=>(
                    
                    <CarouselArticleCard key={index} articleID={article?.id}></CarouselArticleCard>
                ))}
            </div>
            <div className={`carousel-btns--ctnr absolute z-2 w-full top-[50%] translate-y-[-50%]`}>
                <div className={`inline-block w-[50%] text-start`}>
                    {hasMoreLeft && (
                        <button className="w-[60px] h-[60px] bg-black/50 rounded-[50%]" onClick={()=>{handleLeftScroll();}}>
                            <i className="block ml-[34.5%] w-[15px] h-[15px] border-t-[4px] rounded-t-[2px] rounded-br-[2px] border-white border-r-[4px] rotate-[-135deg]"></i>
                        </button>
                    )}

                </div>
                <div className={`inline-block w-[50%] text-end`}>
                    {hasMoreRight && (
                        <button className="w-[60px] h-[60px] bg-black/50 mr-5 rounded-[50%]" onClick={()=>{handleRightScroll();}}>
                            <i className="block ml-[34.5%] w-[15px] h-[15px] border-t-[4px] rounded-t-[2px] rounded-br-[2px] border-white border-r-[4px] rotate-45"></i>
                        </button>
                    )}
                    
                </div>
            </div>
        </section>


    )





}

export default Carousel;