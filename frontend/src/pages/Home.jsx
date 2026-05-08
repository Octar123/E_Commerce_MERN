import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/products');

                setProducts(response.data);
                setLoading(false);
            }catch(error){
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if(loading) return <h2>Loading products...</h2>

    return(
        <div style={{padding: '20px'}}>
            <h1>Welcome to our store</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px'}}>
                {products.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px'}}>
                        <h2>{product.title}</h2>

                        <p><strong>Category:</strong>{product.category ? product.category.name : 'Uncategorized'}</p>
                        <p>{product.description}</p>
                        <h3>₹{product.price}</h3>
                        <p style={{fontSize: '12px', color: 'grey'}}>
                            Sold by: {product.vendorId.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;