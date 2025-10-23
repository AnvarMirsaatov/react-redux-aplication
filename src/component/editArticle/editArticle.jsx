import { useNavigate, useParams } from "react-router-dom";
import ArticleService from "../../service/articles";
import { useEffect, useState } from "react";
import LoaderCard from "../../ui/loaderCard";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../../slice/article";
import { getItem } from "../../helpers/persistance-storage";
import axios from "axios";

const EditArticle = () => {
    const { slug } = useParams();
    const dispatch = useDispatch()
    const { articleDetail } = useSelector((state) => state.article)
    const navigate = useNavigate()


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        const getArticlesDetail = async () => {
            try {
                dispatch(getArticleDetailStart());
                const response = await ArticleService.getArticlesDetail(slug);
                setTitle(response?.article?.title)
                setDescription(response?.article?.description)
                setBody(response?.article?.body)
                dispatch(getArticleDetailSuccess(response?.article))
                console.log(response);


            } catch (err) {
                console.log(err);
                dispatch(getArticleDetailFailure("Failed to load article details"));

            }
        };

        getArticlesDetail();

    }, [slug]);



    const formSubmit = async (e) => {
        e.preventDefault();
        const article = { title, description, body };

        try {
            const response = await ArticleService.EditArticle(slug, article);
            console.log("Updated successfully:", response);
            navigate(`/`);
        } catch (error) {
            console.error("Update error:", error);
        }
    };






    if (!articleDetail || !articleDetail.author) {
        return <LoaderCard />;
    }



    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-4 bg-light d-flex flex-column align-items-center justify-content-start p-4 text-center">
                        <img
                            src={articleDetail?.author?.image}
                            alt={articleDetail?.author?.username}
                            className="rounded-circle shadow mb-3"
                            width="120"
                            height="120"
                        />
                        <h5 className="fw-semibold mb-1">@{articleDetail?.author?.username}</h5>

                        <p className="text-muted small">{articleDetail?.author?.bio}</p>
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <span className="badge bg-secondary">
                                ❤️ {articleDetail?.favoritesCount}
                            </span>
                            <span className="badge bg-info">
                                🕓 {new Date(articleDetail?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="col-md-8 p-4">

                        <div className="d-flex justify-content-between align-items-start    ">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">Edit title</span>
                                </div>
                                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={title || " "}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                Edit description
                            </span>
                            <textarea
                                className="form-control"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                rows="5"
                                value={description || ""}
                                onChange={(e) => setDescription(e.target.value)}

                            />
                        </div>

                        <hr />
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">
                                Edit article
                            </span>
                            <textarea
                                className="form-control"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                rows="10"
                                value={body || ""}
                                onChange={(e) => setBody(e.target.value)}

                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button onClick={formSubmit} type="submit" className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditArticle;
