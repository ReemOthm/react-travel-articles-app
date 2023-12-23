import { useState } from 'react';
import Article from './Components/Article';
import Header from './Components/Header';
import { articlesArray } from './Data';
import About from './Components/About';
import PostArticle from './Components/PostArticle';
import { IAreticle } from './Interfaces';

function App() {

  const date = new Date();

  // ------------------------States-----------------------------------
  const [page,setPage] = useState('home');
  const [article,setArticle] = useState<IAreticle>({
    articleName: '',
    articleContent: [],
    articleImages: [],
  });
  const [articles, setArticles] = useState<IAreticle[]>(articlesArray);

  // -------------------------Render-----------------------------------
  const renderArticles = articles.map(article => <Article key={article.id} article={article} />);
  
  const renderArticleList = articles.map(article => <li key={article.id}><a href={`#${article.id}`}>{article.articleName}</a></li>);

  return (
    <>
      <Header articles={articles} setPage={setPage} />

      {page == 'home' ?
        <main className='main'>
        <span id="title">What&apos;s New!</span>
        <div className="container">
          <article className="">
            {renderArticles}
          </article>

          <aside>
            <h3>Common Articles:</h3>
            <ul>
              {renderArticleList}
            </ul>
          </aside>
        </div>
      </main> 
      : page == 'about' ?
        <About /> 
      : page == 'post-article' ?
        <PostArticle article={article} setArticle={setArticle} setPage={setPage} articles={articles} setArticles={setArticles}/>
      : null
      }
      

      <footer className='footer-style'>
          <p style={{margin:0}}>&copy; All right reserved {date.getFullYear()}</p>
          <p style={{margin:0}} id="contact">@travilly</p>
      </footer> 
    </>
  )
}

export default App
