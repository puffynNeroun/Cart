import {useState} from 'react';

interface Product {
    id: number,
    name: string,
    price: number,
    quantity: number
}

const ProductList: Product[] = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 0
    },

    {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 0
    },

    {
        id: 3,
        name: "Product 3",
        price: 300,
        quantity: 0
    },
]

const Cart = () => {
    const [cartItem, setCartItem] = useState<Product[]>([])

    const addToCart = (product: Product) => {
        const check = cartItem.find((item) => item.id === product.id);
        if (check) {
            const updateCart = cartItem.map((item) =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            );
            setCartItem(updateCart)
        } else {
            setCartItem((itemCheck) => [...itemCheck, {...product, quantity: 1}])
        }
    }

    const removeFromCart = (productId: number) => {
        const updateCart = cartItem.map((item) =>
            item.id === productId ? {...item, quantity: item.quantity - 1}
                : item
        )
        setCartItem(updateCart.filter((item) => item.quantity > 0))
    }

    const totalQuantity = cartItem.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
    return (
        <>
        <div className='container'>
            <ul className='product'>
                {ProductList.map((product) => (
                    <li className='product__item' key={product.id}>
                        {product.name} - {product.price}$
                        <button className='add-btn btn' onClick={() => addToCart(product)}><span className='text-btn'>add to cart</span></button>
                    </li>
                ))}
            </ul>
        </div>
            <hr/>
            <div className='container'>
            <ul className='product'>
                {cartItem.map((item) => (
                    <li className='product__item' key={item.id}>
                        {item.name} - {item.price}$ - quantity:  {item.quantity}
                        <button className='remove-btn btn' onClick={() => removeFromCart(item.id)}><span className='text-btn'>remove</span></button>
                    </li>
                ))}
            </ul>
            <p>Full quantity: {totalQuantity}</p>
            <p>Full price: {totalPrice}</p>
            </div>
        </>
    );
};

export default Cart;