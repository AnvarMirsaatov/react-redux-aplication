import React, { useState } from "react";

const ArticleCard = ({ article }) => {
    const [favorited, setFavorited] = useState(article.favorited);
    const [following, setFollowing] = useState(article.author.following);

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
                            <small className="text-muted d-block">{article.author.bio}</small>
                        </div>
                    </div>

                    <button
                        className={`btn btn-sm ${following ? "btn-primary text-white" : "btn-outline-primary"
                            }`}
                        onClick={handleFollow}
                    >
                        <i
                            className={`bi ${following ? "bi-person-check" : "bi-person-plus"
                                } me-1`}
                        ></i>
                        {following ? "Following" : "Follow"}
                    </button>
                </div>
            </div>

            {/* BODY */}
            <div className="card-body">
                <h4 className="fw-bold mb-2">{article.title}</h4>
                <p className="text-muted">{article.description}</p>

                <p
                    className="text-body-secondary mb-4"
                    style={{
                        maxHeight: "6.5rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {article.body}
                </p>

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

                        <a
                            // href={`/article/${article.slug}`}
                            className="btn btn-sm btn-outline-secondary"
                        >
                            Read more
                        </a>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="card-footer bg-light text-muted small">
                <span>ID: {article.id}</span>
            </div>
        </div>
    );
};

export default ArticleCard;
