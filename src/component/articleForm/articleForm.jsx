import { useSelector } from "react-redux"
import { Input } from "../../ui"

const ArticleForm = props => {
    const { title, setTitle, description, setDescription, setBody, body, formSubmit } = props

    const { isLoading } = useSelector(state => state.article)
    return (
        <form onSubmit={formSubmit}>
            <Input state={title} setState={setTitle} label={'Title'} />
            <Input state={description} setState={setDescription} label={'Description'} />
            <hr />
            <div className="form-floating">
                <textarea className="form-control h-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Article</label>
            </div>
            <div className="mt-4 d-flex justify-content-end">
                <button type="submit" className="btn btn-outline-success" disabled={isLoading}
                >

                    {isLoading ? 'Loading...' : 'Create'}
                </button>

            </div>
        </form >
    )
}

export default ArticleForm