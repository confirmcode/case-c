import React from "react";
import { NavLink } from 'react-router-dom'
import { pubDateToStr } from "./inc";

function ArticleCard({article}){
    return (
        <article className="article-card">
            <div className="datetime">
                {pubDateToStr(article.pubDate)}
            </div>
            <h5>
                {article.title}
            </h5>
            <span className='aticle-tags'>
                {article.categories.join(', ')}
            </span>
            <div className="text-right">
                <NavLink className='prolog' to={'/article/'+article.id}>пролог</NavLink>
            </div>
            {/* {article.link} */}
        </article>
    )
}
export default ArticleCard;