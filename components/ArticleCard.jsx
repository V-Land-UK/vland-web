/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";
import React from "react";
import { stringify } from "qs";


const ArticleCard =({article, index}) => {
  
  const { findUserByID, Articles } = useContext(GlobalContext);
  const router = useRouter();
  const rmvWhiteSpace = (str)=>{
    return str.replace(/\s+/g, '');
  }
  // ARTICLE INDEX
  const articleIndex = parseInt(index) + 1;
  
  //FIND SPONSORED POSTS
  const checkCharCount = (post) => {
    const titleChars = rmvWhiteSpace(post);
    const titleCharsCount = titleChars.split('').length - 1;

    return titleCharsCount > 50;
  };

  //const Sponsored = (post) =>{
    //const AddClass = 0;
    

    
    /*post.some((cat) => {
     if (
        cat.attributes.name.toLowerCase() === "culture" 
        
      ) {
       return true;
      } else {
       return false;
     }*/
   

    /*if (titleCharsCount > 40) {
      console.log(titleCharsCount);
      return "col-span-2";
    }
    else{
      
      return "";
    }
  };*/
  

  // className={`w-full flex flex-col bg-white rounded-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container ${Sponsored(
  //   article.attributes?.categories?.data
  // )}`}

  return (
    
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`w-full flex flex-col bg-white rounded-xl shadow-md lg:drop-shadow-2xl lg:shadow-lg row-span-2 ${checkCharCount(article.attributes.title)? "card-medium": "col-span-1"}`}
      >
        {/* POST IMAGE */}
        <div className="relative w-full aspect-square object-cover block rounded-t-xl overflow-hidden">
          <img
            src={`${
              article.attributes?.media?.data[0]?.attributes?.formats?.medium
                ?.url ||
              article.attributes?.media?.data[0]?.attributes?.formats?.large
                ?.url ||
              article.attributes?.media?.data[0]?.attributes?.formats?.small
                ?.url ||
              article.attributes?.media?.data[0]?.attributes?.formats?.thumbnail
                ?.url ||
              article.attributes?.media?.data[0]?.attributes?.url ||
              "/Placeholder.png"
            }`}
            className="w-full h-full object-cover"
            alt={`${
              article.attributes?.media?.data[0]?.attributes?.alternativeText ||
              article?.attributes?.title ||
              ""
            }`}
          />
          <div className="absolute flex flex-wrap gap-2 bottom-3 w-[94%] mx-auto right-0 left-0">
            {/* TAGS/CATEGORIES */}
            {article.attributes?.categories?.data.length > 0 &&
              article.attributes.categories.data.map((category, current) => (
                <p
                  key={current}
                  className={`text-[9px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer  hover:scale-95 transition-all tag ${
                    category.attributes.name.toLowerCase() === "sponsored"
                      ? "text-white bg-green-800 hover:bg-white hover:text-primary"
                      : "text-white bg-primary hover:bg-white hover:text-primary"
                  }`}
                  onClick={() =>
                    router.push(`/category/${category.attributes.slug}`)
                  }
                >
                  {category.attributes.name}
                </p>
              ))}
          </div>
        </div>
        {/* POST BODY */}
        <div
          className={`${
            article.id % 3 === 0 ? "green-body " : ""
          } px-5 py-3 xs:h-[11.0715rem] sm:h-[11.0715rem] md:h-[15.75rem] lg:h-[18rem] flex flex-col justify-around rounded-b-xl`}
        >
          <div className="article-body">
            <Link
              href={`/article/${article.attributes.slug}`}
              className="cursor-pointer"
              passHref
            >
              <h1
                className={` xs:text-[1.4rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.3rem]  xl:text-[2.3rem] border-box xs:pb-[0.1875rem] mb-[0.1875rem] sm:pb-[0.08rem] mb-[0.1875rem] md: pb-[0.1875rem] mb-[0.1875rem] ${
                  article.id % 3 === 0
                    ? "article-title-green "
                    : "article-title"
                }`}
              >
                <span className="underline">{article?.attributes?.title?.length > 65
                  ? article?.attributes?.title.slice(0, 65) + "..."
                  : article?.attributes?.title}
                </span>
              </h1>
            </Link>
            
          </div>
          <div className="my-auto">
            <p className=" lg:text-xs article-desc-home">
              {article?.attributes?.description?.length > 160
                ? article?.attributes?.description.slice(0, 160) + "..."
                : article?.attributes?.description}
            </p>
          </div>

          <div className="article-author-home flex lg:space-x-4 ">
            <img
              src={
                findUserByID(article?.attributes?.author?.data?.id)?.attributes
                  ?.image?.data?.attributes?.formats?.small?.url ||
                findUserByID(article?.attributes?.author?.data?.id)?.attributes
                  ?.image?.data?.attributes?.url ||
                "/User.svg"
              }
              alt="Author"
              className="w-8 h-8 lg:w-9 lg:h-9 aspect-square object-cover rounded-full"
            />

            <div className={"article-author-data"}>
              <p
                className={`txt ${
                  article.id % 3 === 0 ? " text-white" : " text-primary"
                }`}
              >
                {findUserByID(article?.attributes?.author?.data?.id)?.attributes
                  ?.fullname || "V-Land UK"}
              </p>

              <Moment
                format="MMM Do YYYY"
                className={`${
                  article.id % 3 === 0 ? "article-date-green" : "article-date"
                }`}
              >
                {article?.attributes?.PublishDate}
              </Moment>
            </div>
          </div>
        </div>
      </motion.div>
   
  );
};

export default ArticleCard;
