$(document).ready(function(){

   var searchBox = document.getElementById('search-box')
   
   searchBox.addEventListener('keypress', function(event){
      if(event.which!==13 || !event.target.value) return;
      $('#loader').addClass('active');
      var query = encodeJumiaQuery(event.target.value);
      var url = `https://www.jumia.ma/catalog/?q=${query}`;
      event.target.value = '';

      helpers.getHTMLString(url)
      .then(htmlString => {
         const doc = helpers.getDocumentElement(htmlString);
         $('#loader').removeClass('active');
         $('#cards-container').html('');
         const p = helpers.jumiaProducts(doc, createProductElement);
      })
      .catch(err => console.log(err));
      
   });

   

   function encodeJumiaQuery(queryString){
      return  queryString.split(' ').join('+');
   }
   
   function createProductElement(product){
   const productMarkup = `<div class="ui card">
                         <div class="blurring dimmable image">
                           <div class="ui dimmer">
                             <div class="content">
                               <div class="center">
                                 <div class="ui inverted button">See Product</div>
                               </div>
                             </div>
                           </div>
                           <img src="${product.imageUrl}">
                         </div>
                          <div class="content">
                            <div class="header">${product.brand}</div>
                            <div class="description">${product.name}</div>
                          </div>
                          <div class="extra content">
                            <i class="money icon"></i>
                            ${product.price}DH
                          </div>
                        </div>`;
      document.getElementById('cards-container').innerHTML += productMarkup;
   }
   
   
   $('.cards .image').dimmer({
     on: 'hover'
   });
   
});

