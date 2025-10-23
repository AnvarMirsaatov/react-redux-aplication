import { useSelector } from "react-redux";
import ArticleCard from "../articlesCard";
import LoaderCard from "../../ui/loaderCard";
import { Link } from "react-router-dom";

const Main = () => {
  const { articles, isLoading, error } = useSelector((state) => state.article);

  return (
    <div >
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link to={'/createArticle'} className="nav-link active" href="#">Create article</Link>
        </li>
      </ul>
      {error && <p className="text-danger text-center">Error: {error}</p>}

      <div className="row justify-content-center g-4 my-2 " >
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
