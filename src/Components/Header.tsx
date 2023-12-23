import { useState } from "react";
import { IAreticle, SearctObject, pages } from "../Interfaces";

interface IProps{
    setPage: (val:pages)=> void,
    articles: IAreticle[]
}

const Header = ({setPage,articles}:IProps)=>{
    
    
    const list:SearctObject = {
        title: '',
        id: ''
    };

    // -------------STATES----------------
    const [listSearched, setListSearched] = useState<SearctObject[]>([]);

    // -------------HANDLER---------------
    const handelSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let array = [...listSearched];
        articles.map(article =>{
            const title = article.articleName.toLowerCase();
            if(title.split(' ').includes(e.target.value)){
                list.title= title;
                list.id= article.id;
                array = array.filter(arr=> arr.title !== title)
                array.push(list);
                setListSearched(array);
            }
        });
        
        console.log(listSearched);
        console.log(array);
        if(e.target.value === ''){
            setListSearched([]);
        }
        console.log('changed')
    }

    return (
        <header>
            <span id="logo">Travel Articles</span>
            <nav>
                <ul  className='links'>
                    <li><a onClick={()=>setPage('home')}>Home</a></li>
                    <li><a onClick={()=>setPage('about')}>About</a></li>
                    <li><a onClick={()=>setPage('post-article')}>Post an Article</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    <div className="search">
                        <input type="search" name="search" placeholder="search for article" onChange={handelSearch} />
                    </div>
                    <ul className="searchList">
                        {listSearched.map(li=> <li key={li.title}><a onClick={()=>setListSearched([])} href={`#${li.id}`}>{li.title}</a></li>)}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;