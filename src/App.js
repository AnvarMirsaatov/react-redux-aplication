import { Route, Routes } from "react-router-dom";
import { Login, Register, Main, Navbar } from "./component";
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
      console.log(response);
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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
