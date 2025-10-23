import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
    const [favorited, setFavorited] = useState(article.favorited);
    const [following, setFollowing] = useState(article.author.following);

    const { user } = useSelector(state => state.auth)
    const handleFavorite = () => setFavorited(!favorited);
    const handleFollow = () => setFollowing(!following);

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
            <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center">
                        <img
                            src={article.author.image}
                            alt={article.author.username}
                            className="rounded-3 me-3"
                            style={{
                                width: "56px",
                                height: "56px",
                                objectFit: "cover",
                                border: "2px solid rgba(0,0,0,0.04)",
                            }}
                        />
                        <div>
                            <h6 className="mb-0 fw-semibold text-capitalize">{article.author.username}</h6>
                            <small className="text-muted d-block trimText" style={{

                                maxHeight: "2.5rem",
                                overflow: "hidden",
                            }}>{article.author.bio}</small>
                        </div>
                    </div>

                    {user.username !== article.author.username &&
                        <button className={`btn btn-sm ${following ? "btn-primary text-white" : "btn-outline-primary"
                            }`}
                            onClick={handleFollow}
                        >
                            <i
                                className={`bi ${following ? "bi-person-check" : "bi-person-plus"
                                    } me-1`}
                            ></i>
                            {following ? "Following" : "Follow"}
                        </button>
                    }
                </div>
            </div>

            <div className="card-body d-flex flex-column justify-content-between">
                < div className="d-flex flex-column justify-content-start">
                    <h4 className="fw-bold mb-2 ">{article.title}</h4>
                    <p className="text-muted trimText m-0">{article.description}</p>

                    <p className="text-body-secondary mb-4 trimText">
                        {article.body}
                    </p>
                </div>
                    <>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {new Date(article.createdAt).toLocaleDateString()} •{" "}
                            <i className="bi bi-pencil me-1"></i>
                            {new Date(article.updatedAt).toLocaleDateString()}
                        </small>

                        <div className="d-flex align-items-center gap-2">
                            <button
                                className={`btn btn-sm ${favorited ? "btn-danger text-white" : "btn-outline-danger"
                                    }`}
                                onClick={handleFavorite}
                            >
                                <i
                                    className={`bi ${favorited ? "bi-heart-fill" : "bi-heart"
                                        } me-1`}
                                ></i>
                                {favorited ? article.favoritesCount + 1 : article.favoritesCount}
                            </button>

                            <Link
                                to={`/articleDetail/${article.slug}`}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Read more
                            </Link>
                        </div>
                    </div>
                </>
            </div>

            <div className="card-footer bg-light text-muted small">
                <span>ID: {article.id}</span>
            </div>
        </div>
    );
};

export default ArticleCard;
