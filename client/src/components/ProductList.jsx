import { useEffect, useState, useMemo } from "react"
import { ProductCard } from "./ProductCard"
import { Pagination } from "./Pagination";
import axios from 'axios';

import { PAGE_SIZE } from '../constants'

//Pagination can also be implemnted in the backend.
//In a real app, it's usually better to design it with backend pagination.
//We can discuss it. 

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [wishlist, setWishlist] = useState([]);
    const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false)
            }
        };

        fetchProducts();
    }, [])

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist)
    }, [])

    const productsToShow = useMemo(() => {
        if (showOnlyWishlist) {
            setCurrentPage(1)
            return products.filter((product) => wishlist.includes(product.id));

        }
        else return products
        // return showOnlyWishlist
        //     ? products.filter((product) => wishlist.includes(product.id)) 
        //     : products
    }, [products, showOnlyWishlist, wishlist]);

    const totalPages = useMemo(() => {
        return Math.ceil(productsToShow.length / PAGE_SIZE)
    }, [productsToShow])

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return productsToShow.slice(startIndex, endIndex);
    }, [currentPage, productsToShow])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleToggleWishlist = (productId) => {
        const listToUpdate = wishlist.includes(productId) ? wishlist.filter(id => id !== productId) :
            [...wishlist, productId]
        setWishlist(listToUpdate)
        localStorage.setItem('wishlist', JSON.stringify(listToUpdate))
    }

    return (
        <div className="container mx-auto mt-16">
            <label className="flex items-center ml-5">
                <input
                    type="checkbox"
                    className="mr-2"
                    checked={showOnlyWishlist}
                    onChange={() => setShowOnlyWishlist(!showOnlyWishlist)}
                />
                Display only products from wishlist
            </label>
            <div className='flex flex-wrap justify-center gap-4'>
                {isLoading ? <div>Loading indicator...</div> : paginatedProducts.length ? paginatedProducts.map((product) => (
                    <div key={product.id} className='p-4'>
                        <ProductCard product={product} onToggleWishlist={handleToggleWishlist} isInWishlist={wishlist.includes(product.id)} />
                    </div>
                )) : ''}

            </div>
            <div className='mb-8'>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    )
}