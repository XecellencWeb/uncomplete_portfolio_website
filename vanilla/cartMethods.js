export const updateCart = (e)=>{
    e.stopPropagation()

      addToCart({id,name,amount,rating,img:item.pictures[0],number:1})
      authBox(200,'Added to Cart')
  }

export   const showRating = (e)=>{
    e.stopPropagation()
   const ratePage = document.querySelector('#toggle-rating')
   ratePage.checked = true
    ratePage.setAttribute('data-id',id)
  }
  