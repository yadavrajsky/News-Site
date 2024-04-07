import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopNews, resetArticlesState } from "../../reducers/newsSlice";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const News = () => {
  const dispatch = useDispatch();
  const { isLoading, error, totalResults, articles, categoryFetchingLoading } =
    useSelector((state) => state.articles);
  const { category } = useParams();
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTopNews({ country: "in", category }));
  }, [category, dispatch]);

  useEffect(() => {
    if (error) dispatch(resetArticlesState());
  }, [dispatch, error]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 20
    ) {
      // Fetch more articles if available
      if (articles.length < totalResults && !isLoading) {
        dispatch(
          fetchTopNews({
            country: "in",
            category,
            page: Math.ceil(articles.length / 20) + 1, // Assuming 20 articles per page
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!categoryFetchingLoading) {
      const currentContainerRef = containerRef.current;
      currentContainerRef.addEventListener("scroll", handleScroll);

      return () => {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, [categoryFetchingLoading, handleScroll]);

  return (
    <div
      className="mx-auto py-8 dark:bg-gray-800 min-h-screen"
      ref={containerRef}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Top News"}
        </h1>
        {categoryFetchingLoading ? (
          <div className="flex items-center justify-center mt-8">
            <ClipLoader
              color={"#3B82F6"}
              loading={categoryFetchingLoading}
              css={css`
                margin: auto;
              `}
              size={35}
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 flex flex-col items-center "
                >
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-auto lg:w-full lg:h-80 rounded-md mb-4 lg:mr-4 lg:mb-0"
                    />
                  )}
                  {!article.urlToImage && (
                    <div className="w-full h-auto lg:w-full lg:h-80 rounded-md mb-4 lg:mr-4 lg:mb-0 bg-gray-300">
                      <span role="img" aria-label="Image Not Found">
                        📷 Image Not Found
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2 text-gray-900 mt-2 dark:text-gray-100">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Read more
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {isLoading && (
              <div className="flex items-center justify-center mt-8">
                <ClipLoader
                  color={"#3B82F6"}
                  loading={isLoading}
                  css={css`
                    margin: auto;
                  `}
                  size={35}
                />
              </div>
            )}
            {error && (
              <p className="text-center text-red-600 mt-4">
                Error: {error.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
