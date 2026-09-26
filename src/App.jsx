import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Main from "./pages/Main"
import Book from "./pages/Book"
import Search from "./pages/Search"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="search" element={<Search />} />
                <Route path="book/:id" element={<Book />} />
            </Route>
        </Routes>
    )
}

export default App
