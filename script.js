const search = document.getElementById('search');
const cat = document.getElementById('category');

fetch('https://dummyjson.com/products')
.then((data) => {
    return data.json();
})
.then((jsonData) => {
    //console.log(jsonData);
    const productList = jsonData.products;

    show(productList);


    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(categories => {
            const all = document.createElement('option');
            all.value = 'All categories';
            all.textContent = 'All categories';
            cat.appendChild(all);

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.toLowerCase();
                option.textContent = category;
                cat.appendChild(option);
            });
        })
      .catch(error => {
        console.log('Error fetching categories:', error);
      });

    //category
    cat.addEventListener('change', function() {
        const select = this.value.toLowerCase();
        let filter = [];

        if (select === 'all categories'){
            filter = productList;
        } else {
            filter = productList.filter(product => {
                return product.category.toLowerCase() === select;      
            });
        }   

        show(filter)
    });

    //search 
    document.getElementById('search').addEventListener('input', function() {
        const key = this.value.toLowerCase();
        const filter=productList.filter(product => {
            return (
                product.title.toLowerCase().includes(key) ||
                product.description.toLowerCase().includes(key) ||
                product.category.toLowerCase().includes(key)
            );
        });
        show(filter)
    });

    function show(products) {
        let data1 = "";
        products.forEach(product => {
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
            const clicked = productList.find(product => product.id === parseInt(productId));

            openProductIndoPage(clicked);
        
        });
    });
}

    function openProductIndoPage(product) {
        const images = product.images.map(imgUrl => `<img src="${imgUrl}" alt="gallery" class="gallery">`).join('');

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

        const productWindow = window.open('', '_blank');
        productWindow.document.write(productInfoPage);
        productWindow.document.close();

    }

})
.catch((error) => {
    console.log('Error fetching data:', error);
});
