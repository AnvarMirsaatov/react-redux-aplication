import { useSelector } from "react-redux";
import ArticleCard from "../articlesCard";
import LoaderCard from "../../ui/loaderCard";

const Main = () => {
  const { articles, isLoading, error } = useSelector((state) => state.article);

  return (
    <div className=" py-5 bg-light">
      {error && <p className="text-danger text-center">Error: {error}</p>}

      <div className="row justify-content-center g-4">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="col-md-6 col-xl-4 d-flex justify-content-center"
            >
              <LoaderCard />
            </div>
          ))
        ) : articles && articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className="col-md-6 col-xl-4 d-flex justify-content-center"
            >
              <ArticleCard article={article} />
            </div>
          ))
        ) : (
          !error && <p className="text-center text-muted">No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
