import {useEffect, useCallback, useState, useRef} from "react";
import { fa } from "@fortawesome/free-solid-svg-icons";


const CookieSetupPrompt = (bool=true)=>{
    const [ECtoggleActive,ECsetToggleActive] = useState(false);

    const toggleEC = ()=>{
        ECsetToggleActive(() => {return ECtoggleActive ? false:true});
    };

    return(

        <div className="fixed w-screen h-screen bg-black/75 z-[9999] top-0">
            <div className="relative border-box pt-8 rounded-[6px] bg-white m-auto h-[90vw] w-[90%] lg:h-[50vw] max-h-[500px] max-w-[500px] lg:w-[50%] top-[15%] xl:w-[35%] xl:h-[35vw] lg:max-h-[550px] lg:max-w-[550px] lg:top-[10%]" role="alertdialog" aria-describedby="trust-policy-text" aria-label="We care about your privacy">
                <div className="relative w-[100%] max-h-[80%] overflow-scroll scroll-py-0">
                    <div className="relative w-[85%] lg:w-[80%] mx-auto">
                        <h3 className="font-semibold text-primary mx-auto text-center text-sm">We care about your privacy</h3>
                        <p className="text-xs mt-2">We and our partners store and/or access information on your device to help:</p>
                        <ul className="ml-5 list-outside mt-2 text-xs">
                            <li className="ml-2 mt-3">Provide you with the best possible service and experience when using our website</li>
                            <li className="ml-2 mt-3">Gain insight into how you use and interact with our content</li>
                            <li className="ml-2 mt-3">Personalise content and ads</li>
                        </ul>
                        <p className="text-xs mt-5">Cookies and similar technologies are used by us and selected companies strictly for this reason.</p>
                        <p className="text-xs mt-3">You may accept or make granular choices, including exercising your right to object to companies processing personal data based on legitimate interest instead of consent.These choices will be signaled to our partners and will not affect browsing data. {" "} <a href="/privacy-policy" className="underline font-semibold">More Information</a></p>
                        
                        <h4 className="font-semibold text-sm mt-3">Essential cookies</h4>
                        <div className="border-box pb-3 border-b-[1.25px] mt-2 border-gray-400 text-xs">
                            <p>These cookies are necessary for the website to work as intended and therefore cannot be switched off in our systems.They are usually only set in response to actions made by you which amount to a request for services,
                            such as setting your privacy preferences, logging in or filling in forms. 
                            You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
                            These cookies do not store any personally identifiable information.</p>
                            <div className="relative text-end w-[100%] mt-2">
                                
                                <p className="text-start w-[90%] inline-block align-top font-semibold" style={{marginBlockEnd:"0"}}>More information</p>
                               
                                
                                <button className={`w-[10%] text-center`} onClick={()=>{toggleEC()}}>
                                    <i className={`inline-block w-[12px] h-[12px] origin-center  border-black border-r-[2.5px] border-b-[2.5px] ${ECtoggleActive ? "rotate-[-135deg]": "rotate-45"}`}></i>
                                </button>
                                {ECtoggleActive && (
                                    <div className="mt-3 text-start text-xs">
                                        <p className="font-semibold">Enabling these cookies allows us to:</p>
                                        <ul className="list-outside ml-3 mt-2">
                                            
                                            <li className="mt-2">Manage the signup and general administration of creating or opening an
                                            account opening.</li>
                                            <li className="mt-2">Remember your Login details and prevent you from logging in every time
                                            you visit a new page on the site</li>
                                            <li className="mt-2">remember your details for future correspondence when you submit data through
                                            forms such as contact or comment details</li>
                                            <li className="mt-2">store and retain your site preferences on your mobile device or computer</li>
                                            
                                        </ul>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                        <h4 className="font-semibold text-sm mt-3">Optional cookies</h4>
                        <div className="border-box pb-3 border-b-[1.25px] mt-2 border-gray-400 text-xs">
                            <p>In some cases, this website uses cookies provided by trusted third parties that serve content or
                            render advertising and analytics services on this website.</p>
                            <p className="underline font-semibold mt-3">Manage cookies</p>
                        </div>
                        
                    </div>
                </div>    
                <div className="absolute bg-white rounded-b-[6px] top-[80%] flex items-center w-[100%] text-center h-[20%] border-gray-400 border-t-[1.25px]">
                    <div className="mx-auto">
                        <button className="w-[9rem] rounded-[2.5px] border-box py-3 bg-primary mr-3 text-xs text-white">Show purposes</button>
                        <button className="w-[9rem] rounded-[2.5px] bg-primary border-box py-3 text-xs text-white">I Accept</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CookieSetupPrompt