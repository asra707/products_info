fetch('https://dummyjson.com/products')
.then((data) => {
    return data.json();
})
.then((jsonData) => {
    //check
    //console.log(jsonData);

    // Assuming it contains the JSON object provided

    const productList = jsonData.products;

    let data1="";

    productList.forEach(product => {
        data1 += `<div class="section">
        <img src="${product.thumbnail}" alt="Product Image" class="images">
        <h3 class="title">${product.title}</h3>
        <p>${product.description}</p>
        <p class="category">${product.category}</p>
        <p class="price">$${product.price}</p>
        <p class="discount"> Discount: ${product.discountPercentage}%</p>
        <p class="sock"> Stock: ${product.stock} </p>
        </div>`;
    }); 

    document.getElementById("sections").innerHTML = data1;

})
.catch((error) => {
    console.log('Error fetching data:', error);
});
