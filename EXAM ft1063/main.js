const productList = document.querySelector('#product-list'); // Container for products
const searchName = document.querySelector('#search-name'); // Search input
let products = []; // List of products

// Fetching product data from the API
const fetchProducts = async () => {
    try {
        const response = await fetch('https://raw.githubusercontent.com/diyor011/apibest/master/api.json');
        const data = await response.json();
        console.log(data); // Log the full response
        products = data; // Assuming the API directly returns a list of products
        renderCards(products); // Render cards with the products
    } catch (err) {
        console.error('Error fetching products:', err);
    }
};

// Render product cards
const renderCards = (data) => {
    productList.innerHTML = ''; // Clear the container
    data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-lg text-center';
        card.innerHTML = `
            <img src="${product.pic}" alt="${product.name}" class="w-full h-40 object-cover rounded-t-lg">
            <h3 class="text-xl font-semibold mt-2">${product.name}</h3>
            <p class="text-gray-600 mt-1">${product.fulldesc}</p>
            <p class="text-green-600 font-bold mt-2">$${product.price}</p>
        `;
        productList.appendChild(card);
    });
};

// Filter products based on the search query
const filterProducts = () => {
    const searchQuery = searchName.value.toLowerCase(); // Get search query
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
    renderCards(filteredProducts); // Re-render filtered products
};

// Add search event listener
searchName.addEventListener('input', filterProducts);

// Load products on page load
fetchProducts();
