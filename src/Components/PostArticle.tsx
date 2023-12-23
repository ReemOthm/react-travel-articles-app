import { useState } from "react";
import { IAreticle, pages } from "../Interfaces"
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';

interface IProps {
    article: IAreticle
    setArticle: (article:IAreticle)=>void,
    setPage: (val:pages)=>void,
    articles: IAreticle[],
    setArticles: (val:IAreticle[])=>void,
}

const PostArticle = ({article,setArticle,setPage,articles, setArticles}:IProps)=>{

    // --------------STATES-----------------
    const [imageFile, setImageFile] = useState<string[]>([]);
    

    // --------------HANDLERS----------------
    const handelTitle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setArticle({
            ...article,
            articleName: e.target.value
        });
    }

    const handelTextarea = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setArticle({
            ...article,
            articleContent: e.target.value.split('\n\n')
        });
    }

    const handelImage = (files: FileList|null)=>{
        if(files){
            const fileRef = files[0] || '';
            const fileType:string = fileRef.type || '';
            console.log('the file uploaded type is: '+fileType);
            const reader = new FileReader(); 
            reader.readAsBinaryString(fileRef);
            reader.onload = (ev:any)=> {
                setImageFile(prev=>[...prev,`data:${fileType};base64,${btoa(ev.target.result)}`]);
            }
        }
    }

    const handelSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(article.articleName==''){
            toast('Enter a Name for the Article!',{style: {backgroundColor: '#dc3545',color: 'white'}});
            return;
        }
        if(article.articleContent.length == 0 ){
            toast('Write a Content for the Article!',{style: {backgroundColor: '#dc3545',color: 'white'}});
            return;
        }
        const updateArticles = [...articles]; 
        updateArticles.unshift({...article, id:uuidv4(), articleImages: imageFile});
        setArticles(updateArticles);
        setArticle({ articleName: '',
            articleContent: [],
            articleImages: [],}
        );
        console.log(imageFile);
        setPage('home');
    }

    return (
        <main>
            <br />
            <h2 className="write-title">Write An Article</h2>
            <div className="container">
                <div className="postArticle">
                    <form className="articles-container" onSubmit={handelSubmit}>
                        <input type="text" id="article-name" name="article-name" placeholder="type an article name" onChange={handelTitle} />
                        <article className="article">
                                <textarea placeholder="write an article" onChange={handelTextarea}></textarea>
                                Choose Images 
                                <input type="file" accept="image/*" onChange={(e)=>{
                                    handelImage(e.target.files);

                                }} multiple/> 
                                {imageFile && <div className="uploadImages">
                                    { imageFile.map((img,idx)=> <img key={idx} src={img} alt="" />)}
                                </div>
                                }
                                <div className="buttons">
                                    <input  className="btn btn-success" type="submit" value="Post Article" />
                                    <input  className="btn btn-danger" type="reset" value="Reset" />
                                </div>
                        </article> 
                    </form>
                </div>
            </div>
            <Toaster />
        </main>
    )
}

export default PostArticle;