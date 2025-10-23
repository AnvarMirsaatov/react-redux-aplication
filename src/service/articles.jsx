import axios from "./api"

const ArticleService = {
    async getArticles() {
        const { data } = await axios.get('/articles')
        return data
    },

    async getArticlesDetail(slug) {
        const { data } = await axios.get(`/articles/${slug}`)
        return data
    },
    async postArticles(article) {
        const { data } = await axios.post(`/articles`, { article })

        return data
    },
    async deleteArticles(slug) {
        const { data } = await axios.delete(`/articles/${slug}`)
        return data
    }

}



export default ArticleService 