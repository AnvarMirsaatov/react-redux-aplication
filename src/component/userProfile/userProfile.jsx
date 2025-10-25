import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoaderCard from "../../ui/loaderCard";
import ArticleCard from "../articlesCard";


const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { articleDetail, articles, isLoading, error } = useSelector((state) => state.article);
    const dispatch = useDispatch()
    const [filteredArticles, setFilteredArticles] = useState([]);
    const { username } = useParams()



    useEffect(() => {
        if (Array.isArray(articles) && articleDetail?.author?.username) {
            const filtered = articles.filter(
                (e) => e?.author?.username === articleDetail?.author?.username
            );
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles([]);
        }
    }, [articles, articleDetail, dispatch]);





    useEffect(() => {
        if (Array.isArray(articles)) {
            const filtered = articles.filter(
                (e) => e?.author?.username === username
            );
            setFilteredArticles(filtered);
        }
    }, [articles, username]);




















    if (isLoading || !articleDetail) {
        return <p className="text-center mt-5">Loading user profile...</p>;
    }
    console.log('articleDetail', articleDetail);


    return (
        <section className="h-100 gradient-custom-2">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center">
                    <div className="col col-lg-9 col-xl-8">
                        <div className="card">
                            <div
                                className="p-3 d-flex justify-content-between align-items-start text-white"
                                style={{ backgroundColor: "#000" }}
                            >
                                <div className="rounded d-flex flex-row justify-content-start align-items-center">
                                    <div
                                        className="d-flex flex-column"
                                        style={{ width: "150px" }}
                                    >
                                        <div
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <img
                                                src={
                                                    user?.image ||
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF02Jj8T2t7PdkytAw42HDuuSz7yXguKn8Lg&s"
                                                }
                                                alt={user?.username || "User"}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <h5 className="text-capitalize">
                                            {articleDetail?.author?.username || user?.username}
                                        </h5>
                                        {articleDetail?.author?.username === user?.username && (
                                            <p>{user?.email}</p>
                                        )}
                                    </div>
                                </div>

                                {articleDetail?.author?.username === user?.username && (
                                    <Link
                                        to={`/editUserProfile/${user?.username}`}
                                        className="btn btn-outline-light mt-3"
                                        style={{ zIndex: 1 }}
                                    >
                                        Edit profile
                                    </Link>
                                )}
                            </div>
                            <div className="card-body p-4 text-black">
                                <div className="mb-5 text-body">
                                    <p className="lead fw-normal mb-1">About</p>
                                    <div className="p-4 bg-body-tertiary">
                                        <p>{articleDetail?.author?.bio || user?.bio}</p>
                                    </div>
                                </div>
                                <p className="lead fw-normal mb-0">Articles</p>
                                <div className="mt-5 row">
                                    {isLoading ? (
                                        Array.from({ length: 9 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="col-md-6 col-xl-4 d-flex justify-content-center"
                                            >
                                                <LoaderCard />
                                            </div>
                                        ))
                                    ) : filteredArticles && filteredArticles?.length > 0 ? (
                                        filteredArticles?.map((article) => (
                                            <div
                                                key={article.id}
                                                className="col-md-6 col-xl-6 d-flex justify-content-center"
                                            >
                                                <ArticleCard article={article} />
                                            </div>
                                        ))
                                    ) : (
                                        !error && (
                                            <p className="text-center text-muted">
                                                No articles found.
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
