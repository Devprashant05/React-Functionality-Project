import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../Utils/axios";
import Loading from "./Loading";
import { ProductsContext } from "../Utils/Context";
import { toast } from "react-toastify";

function Details() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductsContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    // const getSingleProduct = async () => {
    //     try {
    //         const { data } = await axios.get(`/products/${id}`);
    //         setProduct(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        if (!product) {
            setProduct(products.filter((product) => product.id == id)[0]);
        }
        // getSingleProduct();
    }, []);

    const producDeleteHandler = (id) => {
        const filterProducts = products.filter((product) => product.id !== id);
        setProducts(filterProducts);
        localStorage.setItem("products", JSON.stringify(filterProducts));
        toast.success("Product deleted successfully");
        navigate("/");
    };

    return product ? (
        <div className="w-full h-full bg-zinc-200 p-10 m-auto flex items-center justify-center">
            <div className="details w-[80%] h-[80%] bg-zinc-100 rounded-2xl shadow-lg p-10 flex justify-around items-center">
                <div className="w-[40%] h-full bg-white shadow-lg rounded-2xl overflow-hidden">
                    <img
                        className="w-full h-full object-contain"
                        src={product.image}
                        alt=""
                    />
                </div>
                <div className="content bg-white shadow-2xl flex flex-col w-[55%] h-full rounded-lg items-start p-10 gap-5 justify-center">
                    <h1 className="text-3xl leading-[1.2] font-mono text-amber-700 tracking-wide">
                        {product.title}
                    </h1>
                    <h2 className="text-base text-start text-zinc-500">
                        {product.category}
                    </h2>
                    <h2 className="text-2xl text-red-500">$ {product.price}</h2>
                    <p className="text-sm">{product.description}</p>
                    <div className="links w-full p-2 flex justify-center items-center gap-5">
                        <Link
                            to={`/edit/${product.id}`}
                            className="border-green-400 hover:border-green-500 border-2 text-green-500 hover:scale-95 transition-all shadow-md text-center text-lg rounded w-fit px-5 py-2 "
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => producDeleteHandler(product.id)}
                            className="border-red-400 hover:border-red-500 border-2 text-red-500 hover:scale-95 transition-all shadow-md text-center text-lg rounded w-fit px-5 py-2"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
}

export default Details;
