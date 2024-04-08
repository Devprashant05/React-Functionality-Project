import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Utils/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
    const [products, setProducts] = useContext(ProductsContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        image: "",
        title: "",
        category: "",
        price: "",
        description: "",
    });

    const changeHandler = (e) => {
        setProduct({ ...product, [e.target.name]: [e.target.value] });
    };

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    }, [id]);

    const addProductHandler = (e) => {
        e.preventDefault();

        if (
            product.image.trim().length < 5 ||
            product.title.trim().length < 5 ||
            product.category.trim().length < 5 ||
            product.price.length < 1 ||
            product.description.trim().length < 5
        ) {
            alert("Each and every input must have 5 characters");
            return;
        }

        // const product = {
        //     image,
        //     title,
        //     category,
        //     price,
        //     description,
        // };

        const pi = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pi] = { ...products[pi], ...product };
        setProducts(copyData);
        console.log(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        toast.success("Product updated successfully");
        navigate(-1);
    };

    return (
        <div className="w-full h-full p-10 bg-zinc-200 flex justify-center items-center">
            <form
                onSubmit={addProductHandler}
                className="w-1/2 flex  flex-col gap-5"
            >
                <h1 className="text-center text-2xl font-mono font-bold p-3">
                    Edit Product
                </h1>
                <input
                    type="url"
                    className="p-3 rounded-lg"
                    placeholder="Image Link"
                    name="image"
                    onChange={changeHandler}
                    value={product && product.image}
                />
                <input
                    type="text"
                    className="p-3 rounded-lg"
                    placeholder="Title"
                    name="title"
                    onChange={changeHandler}
                    value={product && product.title}
                />
                <div className="w-full flex justify-between">
                    <input
                        type="text"
                        className="p-3 rounded-lg w-[48%]"
                        placeholder="Category"
                        name="category"
                        onChange={changeHandler}
                        value={product && product.category}
                    />
                    <input
                        type="number"
                        className="p-3 rounded-lg w-[48%]"
                        placeholder="Price"
                        name="price"
                        onChange={changeHandler}
                        value={product && product.price}
                    />
                </div>
                <textarea
                    type="text"
                    rows={10}
                    className="p-3 rounded-lg"
                    placeholder="Enter product description here"
                    name="description"
                    onChange={changeHandler}
                    value={product && product.description}
                />
                <button className="border-blue-400 hover:border-blue-500 border-2 text-blue-500 hover:scale-95 transition-all shadow-md text-center text-lg rounded-lg w-fit px-5 py-2">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default Edit;
