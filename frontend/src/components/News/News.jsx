import { useEffect, useState } from "react";
import "./News.css";

const NewsCards = () => {
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetch("http://localhost:8000/get_news")
    .then((res) => res.json())
    .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
    })
    .catch((error) => {
        console.error("Error al obtener noticias:", error);
        setLoading(false);
    });
}, []);

return (
    <div className="news-container">
    <h2>🗞 Últimas Noticias</h2>
    {loading ? (
        <p className="loading">Cargando noticias...</p>
    ) : (
        <div className="news-scroll">
        {articles.map((article, index) => (
            <div key={index} className="news-card">
            <img src={article.urlToImage} alt={article.title} className="news-image" />
            <div className="news-content">
                <h3>{article.title}</h3>
                <p className="description">{article.description}</p>
                <p className="source">Fuente: {article.source.name}</p>
                <p className="author">Autor: {article.author || "Desconocido"}</p>
                <p className="date">🕒 {new Date(article.publishedAt).toLocaleString()}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
            </div>
        ))}
        </div>
    )}
    </div>
);
};

export default NewsCards;
