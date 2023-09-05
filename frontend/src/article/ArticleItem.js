import React, { useEffect, useState } from "react";
import { pubDateToStr } from "./inc";
import { useParams } from "react-router";
import axios from "axios";
import { NavLink } from 'react-router-dom';

function ArticleItem() {
    const {id} = useParams()
    const [article,setArticle] = useState({id:"",pubDate:"",title:"",link:"",categories:[],description:""});
    console.log('http://localhost:3500/habr/'+id)
    useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get('http://localhost:3500/habr/'+id);
            setArticle(data);
          } catch (error) {
          } finally {
          }
        })();
      }, []);
    return (
        <article  className="article-item">
            <div className="datetime">
                {pubDateToStr(article.pubDate)}
            </div>
            <h5>
                {article.title}
            </h5>
            <span className='aticle-tags'>
              Источник: {article.link}
            </span>
            <br />
            <span className='aticle-tags'>
                {article.categories.join(', ')}
            </span>
            <div dangerouslySetInnerHTML={{__html:article.description.replace(/<a[^>]*>[^<]+<\/a>$/,'')}}></div>
            <div className="d-flex flex-row flex-wrap flex-space-between mt-1">
              <NavLink className='readmore' to='/'>На главную</NavLink>
              <a target="_blank" className="readmore" href={article.link}>Читать на habr.com</a>
            </div>
        </article>
    )
}

export default ArticleItem;