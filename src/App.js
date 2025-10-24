import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  Main,
  Navbar,
  ArticleDetail,
  CreatArticle,
  EditArticle,
  UserProfile,
  EditUserProfile,
} from "./component";
import AuthService from "./service/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUserSuccess } from "./slice/Auth";
import { getItem } from "./helpers/persistance-storage";
import ArticleService from "./service/articles";
import { getArticleStart, getArticleSuccess } from "./slice/article";
const App = () => {
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(getArticleStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticleSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await AuthService.getUser();
      dispatch(signUserSuccess(response.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      getUser();
    }
    getArticles();
  }, []);
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articleDetail/:slug" element={<ArticleDetail />} />
        <Route path="/createArticle" element={<CreatArticle />} />
        <Route path="/editArticle/:slug" element={<EditArticle />} />
        <Route path="/userProfile/:username" element={<UserProfile />} />
        <Route
          path="/editUserProfile/:username"
          element={<EditUserProfile />}
        />
      </Routes>
    </div>
  );
};

export default App;
