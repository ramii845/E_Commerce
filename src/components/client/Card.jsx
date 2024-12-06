import React from 'react'
import { useShoppingCart} from 'use-shopping-cart';
const Card = ({article}) => {
  const { addItem } = useShoppingCart();
  const addToCart = (article) => {
    const product = {
      id : article.id,
      title : article.description,
      image : article.imagelivre,
      price : article.prix,
      qtestock : article.qteStock,
      quantity : 1
    };
    // @ts-ignore
    addItem(product);
    console.log('Item added to cart:', product);
  };
  return (
    <div className="card">
      {article.imagelivre && <img src={article.imagelivre} alt={article.titre}/>}
        <div className="card-content">
            
            <p className="card-description">{article.description.substr(0,20)}</p>
            <h1 className="card-title">Prix : {article.prix} TND</h1>
            <button
              disabled={article.qtestock <= 1}
              className="card-button"
              onClick={() => addToCart(article)}>
              <i className="fa-solid fa-basket-shopping"></i>
              Add to cart
            </button>
        </div>
    </div>
  )
}
export default Card
