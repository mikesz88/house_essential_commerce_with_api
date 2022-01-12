const XAUTHORIZATION = process.env.REACT_APP_COMMERCEJS

const url = new URL (
    "https://api.chec.io/v1/products"
)

let params = {
    "limit": "25",
};
Object.keys(params)
    .forEach(key => url.searchParams.append(key, params[key]));

let headers = {
    "X-Authorization": XAUTHORIZATION,
    "Accept": "application/json",
    "Content-Type": "application/json",
};

class ProductList {
    async productListings() {
        return new Promise(async (success, failure) => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                })
                if (response) {
                    const json = await response.json();
                    const data = json.data
                    .filter(item => item !== 'meta')
                    .map(data => ({
                        name: data.name,
                        desc: data.description,
                        price: data.price.raw,
                        inventory: data.inventory.available,
                        img: data.image.url,
                        category: data.categories[0].slug,
                        quantity: 0
                    }))
                    success({ response, data })
                } else {
                    failure({ error: "Invalid http Request"})
                }
            } catch(error) {
                failure(error);
            }
        })
    }
}

export default ProductList;