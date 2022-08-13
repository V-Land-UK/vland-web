import {useState, useEffect, useCallback} from "react";
import { API } from "../config/api.js";
import { PAGINATION_LIMIT } from "../config/meta.js";
const qs = require("qs");


const useFetch = (articles, page)=>{
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    
    const [hasMore, setHasMore] = useState(true);
   
    const filters  = qs.stringify({
        populate:"*",
        pagination:{
            pageSize: PAGINATION_LIMIT,
            page: page,
        },
        sort:["PublishDate:desc"]
    }, {encodeValuesOnly:true});
    const sendQuery = useCallback(async ()=>{
       
    
        setLoading(true);
        setError(false);
        
        const promise = new Promise((resolve,reject)=>{
            
            
            fetch(`${API}/articles?${filters}`, {
                method: 'GET',
                mode:'cors',
                credentials:'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect:'follow',
                referrerPolicy: 'no-referrer'

            })
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                resolve(data);
            })
            .catch((err) =>{
                setError(err);
                reject(err)
            });    
        });     
        
        const data = await promise;
        
        articles.push(...data.data);

        setLoading(false);
        setHasMore(data.meta.pagination.pageCount < page);
            
       
       



        
    }, [page]);
    useEffect(()=>{
        sendQuery(page);
    }, [sendQuery, page]);
    


    return {loading, error,hasMore};


}

export default useFetch;