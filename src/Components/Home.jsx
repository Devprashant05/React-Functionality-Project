import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { ProductsContext } from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/axios";

function Home() {
    const [products] = useContext(ProductsContext);
    // for getting the value from the search bar and decoding it into a string
    const { search } = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);
    const [filteredProducts, setFilteredProducts] = useState(null);

    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilteredProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!filteredProducts || category == "undefined")
            setFilteredProducts(products);
        if (category != "undefined") {
            setFilteredProducts(products.filter((p) => p.category == category));
            // getProductsCategory();
        }
    }, [category, products]);

    return products ? (
        <>
            <Navbar />

            <div className="h-full w-[80%] p-10 flex items-center flex-wrap justify-center gap-8 overflow-x-hidden overflow-y-auto">
                {filteredProducts &&
                    filteredProducts.map((product) => (
                        <Link
                            to={`/Details/${product.id}`}
                            key={product.id}
                            className="card w-[27%] h-[45vh] flex flex-col justify-start gap-4 items-center hover:scale-105 hover:text-blue-500 hover:font-semibold cursor-pointer transition-all border shadow-md bg-zinc-200 rounded-md"
                        >
                            <div className="w-full h-[80%] bg-white rounded-md overflow-hidden">
                                <img
                                    className="w-full h-full object-contain"
                                    src={product.image}
                                    alt=""
                                />
                            </div>
                            <h1 className="text-center text-sm">
                                {product.title}
                            </h1>
                        </Link>
                    ))}
            </div>
        </>
    ) : (
        <>
            <Loading />
        </>
    );
}

export default Home;
