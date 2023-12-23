export interface IAreticle {
    id?: string | undefined,
    articleName: string,
    articleContent: string[],
    articleImages: string[]
}

export type pages = 'home' | 'about' | 'post-article' ;

export  interface SearctObject  {
    title: string, 
    id: undefined | string
}