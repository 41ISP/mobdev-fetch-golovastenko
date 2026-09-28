import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import BookCard from "../components/BookCard"
import Loader from "../components/Loader"

const Search = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [textField, setTextField] = useState(query)
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (textField.trim().length <= 3) return
        navigate('/search?q=' + encodeURIComponent(textField.trim()))
    }


    useEffect(() => {
        const loadBooks = async () => {
            try {
                setIsLoading(true)
                setBooks([])
                const res = await fetch("https://openlibrary.org/search.json" + "?q=" + query + "&limit=20")
                if (!res.ok) {
                    const data = await res.json()
                    throw new Error(data.detail[0].msg || "Что-то не так?")
                }
                const data = await res.json()
                setBooks(data.docs)
            } catch (error) {
                console.error(error)
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        loadBooks()
    }, [query])

    return (
        <section className="content">
            <div className="search-page-header">
                <div className="section-label">ПОИСК</div>
                <h1>Найдите свою следующую книгу</h1>
                <form onSubmit={handleSubmit} className="search" id="searchForm">
                    <span className="search-icon">⌕</span>
                    <input
                        id="searchInput"
                        type="text"
                        value={textField}
                        onChange={(e) => setTextField(e.target.value)}
                        placeholder="Название, автор или ISBN..."
                    />
                    <button type="submit">Найти</button>
                </form>
            </div>
            <div className="section-header">
                <div>
                    <div className="section-label">РЕЗУЛЬТАТЫ</div>
                    <h2 id="searchTitle">Результаты поиска</h2>
                </div>
                <span className="result-count" id="resultCount">
                    —
                </span>
            </div>
            {!isLoading && error && <p>{error}</p>}
            {isLoading && <Loader />}
            {books.length > 0 ? (
                <div className="book-grid" id="results">
                    {books.map((el, i) => (
                        <BookCard {...el} key={i} book_key={el.key} />
                    ))}
                </div>
            ) : (
                !isLoading && <p>"Книга не найдена"</p>
            )}
        </section>
    )
}

export default Search
