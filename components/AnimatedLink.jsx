import Link from "next/link";
import { useState} from "react";

const AnimatedLink=({href})=>{
    const [linkVisibility, setLinkVisibility] = useState(false);

    return(
        <div className={`toAuthorArticles--container w-fit inline-block align-baseline ml-3 ${linkVisibility ? "translate-x-[0px]":"translate-x-[-90px]"}`}>
            <Link className={`relative text-primary no-underline bottom-[2.3px] text-[.9rem] ${linkVisibility ? "opacity-100":"opacity-0"}`} href={href}>
                <div className="inline-block text-primary">view more</div>
            </Link>
            <div className={`cursor-pointer inline-block relative bottom-[2px] w-[11px] h-[11px] border-primary border-t-[3px] border-r-[3px] ml-2  rounded-tr-[2px] ${linkVisibility ? "rotate-[-135deg]":"rotate-[45deg]"}`}></div>
        </div>
    );
};


export default AnimatedLink;