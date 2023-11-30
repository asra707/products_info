fetch('https://dummyjson.com/products')
.then((data) => {
    return data.json();
})
.then((jsonData) => {
    //check
    //console.log(jsonData);

    // Assuming it contains the JSON object provided

    const productList = jsonData.products;

    let data1= "";

    productList.forEach(product => {
        data1 += `<div class="section" data-product-id="${product.id}">
          <img src="${product.thumbnail}" alt="Product Image" class="images">
          <h3 class="title">${product.title}</h3>
          <p class="category">${product.category}</p>
          <p class="price">$${product.price}</p>
          <p class="discount">Discount: ${product.discountPercentage}%</p>
          <p class="sock">Stock: ${product.stock}</p>
        </div>`;

        
    }); 

    document.getElementById("sections").innerHTML = data1;

    const productSections = document.querySelectorAll('.section');
    productSections.forEach(section => {
        section.addEventListener('click', () => {
            const productId = section.getAttribute('data-product-id');
            const clickedProduct = productList.find(product => product.id === parseInt(productId));

            openProductIndoPage(clickedProduct);
        
        });
    });

    function openProductIndoPage(product) {
        const images = product.images.map(imgUrl => `<img src="${imgUrl}" alt="gallery" class="images">`).join('');

        const productInfoPage = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <title>${product.title} - Product Details</title>
            <link rel="stylesheet" href="style.css">
        </head>

        <body>
            <h1 class="text">${product.title}</h1>

            <div class="product-details">
                <img src="${product.thumbnail}" alt="Product Image" class="images">
                <p>Description: ${product.description}</p>
                <p>Rating: ${product.rating}</p>
                <p>Brand: ${product.brand}</p>
                <div class = "gallery">${images}</div>
            </div>

        </body>
        
        </html>
      `;

        // <p>Images: ${product.images.join('')}</p>

        const productWindow = window.open('', '_blank');
        productWindow.document.write(productInfoPage);
        productWindow.document.close();


    }


})
.catch((error) => {
    console.log('Error fetching data:', error);
});
