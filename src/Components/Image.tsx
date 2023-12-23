// import { useState } from 'react';

interface IProps {
    imageURL: string,
    alt: string,
    width?: string
}

const Image = ({imageURL, alt,width}: IProps)=>{

    return (
        <img src={imageURL} alt={alt} style={{width: width}} />
    )
}

export default Image;