import axios from "axios";
const qs = require("qs");
import { createContext, useEffect, useState } from "react";
import { BiJoystickButton } from "react-icons/bi";
import { API, BASE_URL } from "../config/api";
import { PAGINATION_LIMIT } from "../config/meta";
const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = ({ children }) => {
  const [Authors, setAuthors] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [Cookies, setCookies] = useState({});
  const [Status, setStatus] = useState({
    loading: true,
    success: false,
    error: false,
    text: "",
  });

  //Get Articles again
  useEffect(() => {
    if (Categories.length < 1) {
      axios
        .get(`${API}/categories`)
        .then(({ data }) => {
          var catgs = data.data;
          var sorted_catgs = reorder(catgs);
          setCategories(sorted_catgs);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }

    if (Articles.length < 1) {
      const filters = qs.stringify({
        populate: "*",
        pagination: {
          pageSize: PAGINATION_LIMIT,
        },
      });

      axios
        .get(`${API}/articles?${filters}`)
        .then(({ data }) => {
          const visible_articles = data?.data.filter((article) => {
            const article_date = new Date(article?.attributes?.PublishDate);
            const curr_date = new Date();

            return article_date <= curr_date;
          });

          setArticles(visible_articles);
          //console.log(res);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }
  }, [Categories.length, Categories, Articles.length, Articles]);

  //reorder Categories
  const reorder = (cat_arr) => {
    

    
    const category_index = 
    {
      "Interviews": 0,
      "Food & Drink": 1,
      "Lifestyle": 2,
      "Travel": 3,
      "Culture": 4,
      "Health & Wellbeing": 5,
      "Environment": 6,
      "Fashion & Beauty": 7,
      "Entertainment": 8,
      "Sport":9,
      "Sponsored":10,
      "Ad Feature": 11
      
      
    }
    var sorted_arr = [];
    Object.keys(category_index).forEach(function(key){

      var found = false;
      cat_arr = cat_arr.filter(function(cat){

        if(!found && cat.attributes.name == key){
          sorted_arr.push(cat)
          found = true;
          return false;
        }
        else{
          return true;
        }

      })

    })

    return sorted_arr;


   
   
    

    
  };

  //Get all authors
  useEffect(() => {
    if (Authors.length < 1) {
      axios
        .get(`${API}/authors?populate=*`)
        .then((response) => {
          setAuthors(response.data.data);
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    }
  }, [Authors.length, Authors]);

  //get cookie types
  useEffect(() => {
    if (!Object.keys(Cookies).length) {
      const query = `{cookiePolicy{data{attributes{StatementInParts}}}}`;
      axios
        .post(`${BASE_URL}/graphql`, {
          query: query,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setCookies(
            response?.data?.data?.cookiePolicy?.data?.attributes
              ?.StatementInParts
          );
        })
        .catch((err) => {
          setStatus((prev) => {
            return { ...prev, error: true };
          });
        });
    } else {
      setStatus((prev) => {
        return { ...prev, loading: false };
      });
    }
  }, [Object.keys(Cookies).length, Cookies]);

  //Find a user by ID
  const findUserByID = (id) => {
    const author = Authors?.filter(
      (user) => parseInt(user?.id) === parseInt(id)
    );
    return author[0];
  };

  const isMemberAuthor = (member) => {
    let isAuthor = false;
    const author = Authors?.filter(
      (user) => user?.attributes?.fullname === member
    );
    if (author?.length) isAuthor = true;

    return isAuthor;
  };

  return (
    <Provider
      value={{
        Authors,
        Categories,
        Status,
        Articles,
        Cookies,
        setCookies,
        setArticles,
        setStatus,
        setAuthors,
        setCategories,
        findUserByID,
        isMemberAuthor,
        reorder,
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalProvider, GlobalContext };
