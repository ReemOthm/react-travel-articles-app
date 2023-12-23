import { useState } from "react";
import { IAreticle } from "../Interfaces";
import Image from "./Image";

interface IProps {
    article: IAreticle,
}

const Article = ({article}:IProps)=>{

    const {articleName, articleContent, articleImages, id} = article;

    // -------States----------
    const [more,setMore] = useState(false);
    const [buttonName, setButtonName] = useState('See More');

    // ----------Render----------
    const rendrImages = articleImages.map((img,index) => <Image key={index} width={`calc(100% / ${articleImages.length})`} imageURL={img} alt={article.articleName} />)
    const renderArticlesContent = articleContent.map((content,index) => (
        <div  key={index}>
            <p> 
            {content}
            </p>  
            {articleImages[index] != undefined ? <div key={index} className="articleImg"><Image imageURL={articleImages[index]} alt={articleName}/></div>  : null} 
        </div>
    ))

    return (
        <div className="articles-container" id={id}>
            <h2>{articleName}</h2>
            <article id="article1" className="article">
                {more ? 
                <div>
                    {renderArticlesContent}
                </div>
                : <div>
                    <p>
                        {articleContent[0]}
                    </p>
                    <div className="homeImg">
                        {rendrImages}
                    </div>
                </div>
                }
                <br />
                <button className="more btn btn-secondary button" onClick={()=> {
                    if(buttonName == 'See More'){
                        setMore(true);
                        setButtonName('Less');
                    } else {
                        setMore(false);
                        setButtonName('See More');
                    }
                }}>
                    <em>{buttonName}</em>
                </button>
            </article>
        </div>
    )
}

export default Article;