import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Article.css";
import ArticleCard from "./ArticleCard";

function ArticlePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('http://localhost:3500/habr/');
        setArticles(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

    return (
        <div className="article-list">
          {articles.map((article) => (
            <ArticleCard key={'article-'+article.id} article={article} />
          ))}
        </div>
    )
}

export default ArticlePage;