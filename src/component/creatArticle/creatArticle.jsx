import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleForm from '../articleForm/articleForm';
import ArticleService from '../../service/articles';
import axios from 'axios';
import { getItem } from '../../helpers/persistance-storage';


const CreatArticle = () => {
    const { user, loggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [img, setImg] = useState('')

    const formSubmit = async (e) => {
        const article = { title, description, body }
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/api/articles", { article });

            console.log(response);

        } catch (error) {
            console.log('error', error);
        }
    }

    const formProps = { title, setTitle, description, setDescription, setBody, body, formSubmit }
    console.log("Token:", getItem("token"));

    return (
        <div className="container py-5">
            <h1>Create article</h1>
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-4 bg-light d-flex flex-column align-items-center justify-content-center p-4 text-center">
                        {img ? <img
                            src={img}
                            alt="Uploaded preview"
                            className=' rounded-circle bg-secondary h-50 w-50'
                        />
                            :
                            <div className="border border-1 rounded-circle bg-secondary h-50 w-50 d-flex justify-content-center align-items-center" >
                                <label
                                    htmlFor="fileUpload"
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Upload img
                                </label>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setImg(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>}


                        {loggedIn &&
                            <>
                                <h2 className="text-capitalize">{user.username}</h2>
                                <p>{user.email}</p>
                            </>
                        }
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <span className="badge bg-secondary">
                                ❤️ 0
                            </span>
                            <span className="badge bg-info">
                                <span>🕓 {new Date().toLocaleDateString()}</span>
                            </span>
                        </div>
                    </div>

                    <div className="col-md-8 p-4">
                        <ArticleForm  {...formProps} />
                    </div>
                </div>
            </div>
        </div >


    )
}

export default CreatArticle