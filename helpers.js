window.helpers = (function(){

   
   function createProductElement(product){
      /* Creates a small container for a product */
      let container = document.createElement('div');
      let imageElement = document.createElement('img');
      imageElement.src = product.imageUrl;
      imageElement.ult = product.name;
      container.appendChild(imageElement);
      let brandElement = document.createElement('h3');
      brandElement.textContent = product.brand;
      container.appendChild(brandElement);
      let nameElement = document.createElement('h4');
      nameElement.textContent = product.name;
      container.appendChild(nameElement);
      let priceElement = document.createElement('p');
      priceElement.textContent = product.price;
      container.appendChild(priceElement);
      document.querySelector('#main-body').appendChild(container);
   }
   
   function getDocumentElement(htmlString){
      /* Input: An HTML string */
      /* Return: The Document element of input string  */
      const iframe = _createIframe();
      document.getElementById('i-frames').appendChild(iframe);
      // Setting the html to the iframe element
      iframe.contentWindow.document.write(htmlString);
      // Getting the document
      const doc = iframe.contentWindow.document.documentElement;
      // Deleting the iframe element from DOM
      iframe.parentNode.removeChild(iframe);
      return doc;
   }

   
   function _createIframe(){
      /* Input: ----- */
      /* Return: An invisible iframe element */
      const iframe = document.createElement('iframe');
      iframe.style.display = "none";
      return iframe;
   }
   

   function getHTMLString(url){
      /* Input: url of the wanted page */
      /* Return: Promise that resolves with the response object */
      return new Promise(function(resolve, reject){
         try {
            $.getJSON(`https://allorigins.me/get?url=${url}&callback=?`)
            .done(function(res){
               if(!res || res.contents === null) throw new Error('BAD_REQUEST');
               resolve(res.contents);
            });
         } catch(err){
            reject(err);
         }
      });
   }
   
   function jumiaProducts(doc, callback){
      /* Input: 
            - Document object (required)
            - callback (optional)
         Return: Array of products
      */
      if(!doc) return;
      const products = [];
      const productElements = doc.querySelectorAll(".sku.-gallery");
      productElements.forEach((productE) => {
         // if the element is empty, pass.
         if(!!productE.innerHTML){
            let brand = productE.querySelector('h2.title .brand').textContent;
            let name = productE.querySelector('h2.title .name').textContent;
            let imageUrl = productE.querySelector('.image-wrapper img').dataset.src;
            let price = productE.querySelector('span.price span').textContent;
            let p = {name, brand, imageUrl, price};
            products.push(p);
            /* a callback for each document element */
            if(callback){
               callback(p);
            }
         }
      });
      return products;
   }
   
   return {
      jumiaProducts,
      getHTMLString,
      getDocumentElement,
      createProductElement
   }
   
})();



