import { useSelector } from "react-redux";
import ArticleCard from "../articlesCard";

const Main = () => {
  const { articles, isLoading, error } = useSelector((state) => state.article);

  return (
    <div className="container py-5 bg-light">
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">Error: {error}</p>}

      {!isLoading && !error && (
        <div className="row justify-content-center g-4">
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <div
                key={article.id}
                className="col-md-6 col-xl-4 d-flex justify-content-center"
              >
                <ArticleCard article={article} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No articles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
