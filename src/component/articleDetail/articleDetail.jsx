import { Link, useNavigate, useParams } from "react-router-dom";
import ArticleService from "../../service/articles";
import { useEffect } from "react";
import LoaderCard from "../../ui/loaderCard";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticleDetailFailure,
    getArticleDetailStart,
    getArticleDetailSuccess,
} from "../../slice/article";

const ArticleDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch()
    const { isLoading, articleDetail, error } = useSelector((state) => state.article)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()



    const deleteArticles = async () => {
        try {
            const response = await ArticleService.deleteArticles(slug)
            console.log(response);

        }
        catch (error) {
            console.log(error);
        }
        finally {
            navigate('/')
        }
    }
    useEffect(() => {
        if (!slug) return; // slug bo‘lmasa, hech narsa qilmaydi

        const getArticlesDetail = async () => {
            dispatch(getArticleDetailStart());
            try {
                const response = await ArticleService.getArticlesDetail(slug);

                // Ba’zida backend kechikadi — null qaytsa, xavfsiz tekshiruv:
                if (response && response.article) {
                    dispatch(getArticleDetailSuccess(response.article));
                } else {
                    dispatch(getArticleDetailFailure("No article data found"));
                }
            } catch (err) {
                console.error("❌ Ma'lumotni yuklashda xatolik:", err);
                dispatch(getArticleDetailFailure("Failed to load article details"));
            }
        };

        getArticlesDetail();

        // 🔁 reloadda ham, URL slug o‘zgarsa ham ishlaydi
    }, [slug, dispatch]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-50">
                <LoaderCard animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <p className="text-danger fw-semibold">{error}</p>
            </div>
        );
    }

    if (!articleDetail) {
        return (
            <div className="container py-5 text-center">
                <p className="text-muted">No article found.</p>
            </div>
        );
    }
    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-4 bg-light d-flex flex-column align-items-center justify-content-start p-4 text-center">
                        <img
                            src={articleDetail.author.image}
                            alt={articleDetail?.author?.username || 'unknown'}
                            className="rounded-circle shadow mb-3"
                            width="120"
                            height="120"
                        />
                        <Link to={`/userProfile/${articleDetail?.author?.username}`}>
                            <h5 className="fw-semibold mb-1">{articleDetail?.author?.username || 'unknown'}</h5>
                        </Link>

                        <p className="text-muted small">{articleDetail.author.bio}</p>
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <span className="badge bg-secondary">
                                ❤️ {articleDetail.favoritesCount}
                            </span>
                            <span className="badge bg-info">
                                🕓 {new Date(articleDetail.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-8 p-4">

                        <div className="d-flex justify-content-between align-items-start    ">
                            <h2 className="fw-bold mb-3">{articleDetail.title}</h2>

                            {user.username === articleDetail.author.username && <div className="d-flex gap-2">
                                <button onClick={() => navigate(`/editArticle/${slug}`)} className={"btn btn-sm btn btn-outline-success "}
                                >
                                    <i
                                        className={`bi bi-pencil-square me-1`}
                                    ></i>
                                    Edit
                                </button>
                                <button onClick={deleteArticles} className={"tn btn-sm btn btn-outline-danger "}
                                >
                                    <i
                                        className={`bi  bi bi-trash3-fill me-1`}
                                    ></i>
                                    Delete
                                </button>
                            </div>}
                        </div>
                        <p className="text-muted mb-3">{articleDetail.description}</p>
                        <hr />
                        <p className="lh-lg">{articleDetail.body}</p>
                        <div className="mt-4">
                            {articleDetail.tagList?.length > 0 && (
                                <div className="d-flex flex-wrap gap-2">
                                    {articleDetail.tagList.map((tag, idx) => (
                                        <span key={idx} className="badge bg-primary">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
