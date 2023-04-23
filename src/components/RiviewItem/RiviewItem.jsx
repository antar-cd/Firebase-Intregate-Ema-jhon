import React from 'react';
import './Reviewitem.css'

const RiviewItem = ({product}) => {

    const  {id,img,price,name,quantity} = product;

    return (
        <div className='review-item'>
            <img src={img} alt="" />
        </div>
    );
};

export default RiviewItem;