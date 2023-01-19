import axios from "axios";
import { API } from "../config/api";

const parse = require("html-react-parser");

const cookiePolicy =({statement, cookies})=>{
    

    return(

        <div className="w-[80%] mx-auto list-outside">
            {parse(statement)}
        </div>
    )
}




export async function getStaticProps(){
    const data = await axios.get(`${API}/cookie-policy`);
    
    

    return {
        props: {
            statement: data?.data?.data?.attributes?.statement,
            cookies: data?.data?.data?.attributes?.StatementInParts
        }

    };


}

export default cookiePolicy;