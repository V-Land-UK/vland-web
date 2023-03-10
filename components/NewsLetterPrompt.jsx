import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { API } from "../config/api";
import Loader from "./Loader";
import { setCookie } from "../lib/utils";
import {subscribeUser} from "@strapi-newsletter/react";


const NewsLetterPrompt = ()=>
{
    const [Email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [validExit, setValidExit] = useState(false);

    const options = {
        position: "top-right",
        autoClose: 4000,
        draggable: true,
        pauseOnHover: true,
        closeOnClick: true,
    };
    const handleExitNLPrompt = ()=>{
        setValidExit(true);
        setCookie("user-type", `guest_${Date.now()}`, {"max-age":2592000})
    }
    const submitEmail = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = `${BASE_URL}`;
        const email = Email.toLowerCase();
      
        subscribeUser(email,url)
          .then((res) => {
            setEmail("");
            setIsLoading(false);
            toast.success("Welcome aboard! 🎉", options);
          })
          .catch((err) => {
            setIsLoading(false);
            toast.error("Something went wrong, please try again 🥲", options);
          });
    }

    return(
        <div className={`${validExit ? "hidden":"fixed"} left-[50%] translate-x-[-50%] z-[999] top-[20%] w-[90%] max-w-[480px] text-center border-box py-5 bg-primary`}>
            <div className="w-[95%] text-end mx-auto">
                <button className="w-[35px] h-[35px] bg-[#2F6B2D] text-white text-center" onClick={()=>{handleExitNLPrompt();}}>
                    <FontAwesomeIcon icon={faXmark} className="w-[16px] h-[16px] m-auto"></FontAwesomeIcon>

                </button>
            </div>
            <h4 className="mx-auto font-bold text-white text-lg sm:text-2xl">Sign Up For Our Newsletter</h4>
            <p className="mx-auto mt-5 w-[50%] font-semibold text-[0.8rem] sm:text-[1rem] text-white">Never miss out on exclusive articles, deals, and giveaways.</p>

            <form
                onSubmit={submitEmail}
                className=" w-[90%] xs:w-[70%] sm:w-[60%] mt-5 mx-auto  flex border-[1px] border-[#2F6B2D] gap-2 px-1 py-1 rounded-3xl lg:rounded-[2rem]"
            >
                <input
                name="email"
                type="email"
                className="w-full text-neutral-50 bg-transparent text-sm focus:outline-none poppins placeholder-[#2F6B2D]/60 font-medium px-3 lg:px-4 rounded-3xl"
                placeholder="Email address"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button
                type="submit"
                name="Subscribe"
                className="bg-[#2F6B2D] hover:bg-[#40913D] transition-all text-white text-xs font-semibold rounded-3xl poppins px-5 py-3 lg:py-4"
                >
                    {isLoading ? <Loader /> : "Subscribe"}
                </button>
            </form>
            
        </div>

    );

};


export default NewsLetterPrompt;