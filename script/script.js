let bagItem;
onLoad();



function onLoad(){
   let bagItemStr=localStorage.getItem('bagItem');
   bagItem=bagItemStr ? JSON.parse(bagItemStr):[];
   displayItems();
   displayBagIcon();
}

  function addToBag(itemId){
     
     bagItem.push(itemId);
     localStorage.setItem('bagItem',JSON.stringify(bagItem));
     displayBagIcon()
   }


 function displayBagIcon(){
  let addtobagclass=document.querySelector('.add-to-bag');
  

  if (bagItem.length>0)
  {
    addtobagclass.style.visibility='visible';
    addtobagclass.innerText=bagItem.length;
  }
  else{
    addtobagclass.style.visibility='hidden';
  }

 }



function displayItems()
{
  let items_container = document.querySelector(".items-container");
  if(!items_container)
  {
    return;
  }
  let outerHtml = "";
  
  items.forEach((item) => {
    outerHtml += `
         <div class="item-container">
         <img class="item-image" src="${item.image}" alt="item_image">
         <div class="rating"> ${item.rating.stars}⭐|${item.rating.count}</div>
         <div class="company-name">${item.company}</div>
         <div class="item-name">${item.item_name}</div>
         <div class="price">
           <span class="current-price">Rs ${item.current_price} </span>
           <span class="original-price">Rs ${item.original_price} </span>
           <span class="discount-price">(${item.discount_percentage}% off)</span>
         </div>
         <div class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</div>
       </div>
         `
  });
  items_container.innerHTML = outerHtml;
  
}

