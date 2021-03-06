/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Moment from "react-moment";

const Recommendation = ({ article }) => {
  const { findUserByID } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <>
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
                className={`text-[5px] lg:text-[10px]  px-2 py-1 rounded-2xl drop-shadow-md cursor-pointer  hover:scale-95 transition-all tag ${
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
        className={`flex flex-col h-[12rem] lg:h-[18.3rem]  bg-white rounded-xl shadow-md lg:drop-shadow-none lg:shadow-lg article-container`}
      >
        <div className="article-body px-4 lg:px-5 my-auto ">
          <Link href={`/article/${article.attributes.slug}`} passHref>
            <h1 className="text-[1.05rem] py-1 lg:text-3xl  lg:pb-3 leading-tight article-title">
              {article?.attributes?.title?.length > 65
                ? article?.attributes?.title.slice(0, 65) + "..."
                : article?.attributes?.title}
            </h1>
          </Link>
        </div>
        <p className="lg:text-xs  article-desc my-auto px-4 lg:px-10">
          {article?.attributes?.description?.length > 160
            ? article?.attributes?.description.slice(0, 160) + "..."
            : article?.attributes?.description}
        </p>
        <div className="article-author pb-2 lg:pb-3 ml-5">
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

          <div className="article-author-data ">
            <p className="txt">
              {findUserByID(article?.attributes?.author?.data?.id)?.attributes
                ?.fullname || "V-Land UK"}
            </p>
            <Moment format="MMM Do YYYY" className="article-date">
              {article?.attributes?.PublishDate ||
                article?.attributes?.publishedAt ||
                article?.attributes?.createdAt}
            </Moment>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendation;
