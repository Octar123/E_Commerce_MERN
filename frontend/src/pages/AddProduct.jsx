import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            }catch(error){
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage('');
        try{
            const token = localStorage.getItem('token');

            if(!token){
                setMessage('You must be logged in to add a product.');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const newProduct = {
                title,
                description,
                price: Number(price),
                stock: Number(stock),
                category
            };

            await axios.post('http://localhost:5000/api/products', newProduct, config);
            alert('Product added successfully!');
            navigate('/');

        }catch(error){
            setMessage(error.response?.data?.message || 'Failed to add product');
        }
    }

    return (
        <div style={{maxWidth: '500px', margin: '40px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontFamily: 'sans-serif'}}>
            <h2 style={{textAlign: 'center', color: '#333', marginBottom: '20px'}}>Add new product</h2>

            {message && <div style={{padding: '10px', marginBottom: '15px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '5px'}}>{message}</div>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'}}>Product Title:</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box'}}
                        />
                </div>

                <div>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'}}>Product Description:</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box'}}
                        />
                </div>

                <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'}}>Price (₹):</label>
                        <input 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            min="0"
                            style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box'}}
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'}}>Stock Quantity:</label>
                        <input 
                            type="number" 
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                            min="0"
                            style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box'}}
                        />
                    </div>
                </div>
                <div>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px'}}>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box'}}
                    >
                        <option value="">-- Select a Category --</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{marginTop: '10px', padding: '12px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'}}>
                        Publish Product
                </button>
            </form>

        </div>
    );
};

export default AddProduct;