const CONVENIENCE_FEES= 99;
let itemObject;
onLoad();

function onLoad()
{
  getItemObject();
  displayBagItem();
  displayBagSummary()
  
  
 
}

 
   function getItemObject()
   {
       
         itemObject=bagItem.map((item)=>{
               for(let i=0;i<items.length;i++)
               {
                 if(item==items[i].id)
                 {
                     return items[i];
                 }
               }
           })
          console.log(itemObject);
   }
function displayBagItem()
{
     let bagItemContent=document.querySelector('.bag-items-container')
      let innerHTML='';
     itemObject.forEach(bagItem => {
        innerHTML+=generateBagItem(bagItem);
     });
     bagItemContent.innerHTML=innerHTML;
}


function generateBagItem(item)
{
      return `<div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period}days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item. delivery_date}</span>
        </div>
      </div>
 
      <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
    </div>` 
}



function removeFromBag(itemId)
{
   bagItem=bagItem.filter(bagId=>bagId !=itemId)  
   localStorage.setItem('bagItem', JSON.stringify(bagItem));

   getItemObject();
   displayBagItem();
   displayBagIcon();
   displayBagSummary();

}


function displayBagSummary()
{
    let bag_summary=document.querySelector('.bag-summary');
    let totalItem=itemObject.length;
    let totalMrp=0;
    let discountMrp=0;
    
    itemObject.forEach((bagItem)=>{
        totalMrp+=bagItem.original_price;
        discountMrp+=bagItem.original_price-bagItem.current_price;
    })
    let totalAmount=0;
    if (totalItem>0)
    {
       totalAmount+=totalMrp-discountMrp+CONVENIENCE_FEES;
    }
   


    bag_summary.innerHTML=` <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem}Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMrp}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${discountMrp}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹ 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${totalAmount}</span>
    </div>
  </div>`
}