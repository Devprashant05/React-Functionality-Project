import React, { useContext, useState } from "react";
import { ProductsContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductsContext);

    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const addProductHandler = (e) => {
        e.preventDefault();

        if (
            image.trim().length < 5 ||
            title.trim().length < 5 ||
            category.trim().length < 5 ||
            price.trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("Each and every input must have 5 characters");
            return;
        }

        const product = {
            id: nanoid(),
            image,
            title,
            category,
            price,
            description,
        };
        setProducts([...products, product]);
        localStorage.setItem(
            "products",
            JSON.stringify([...products, product])
        );
        toast.success("Product added successfully");
        navigate("/");
    };

    return (
        <div className="w-full h-full p-10 bg-zinc-200 flex justify-center items-center">
            <form
                onSubmit={addProductHandler}
                className="w-1/2 flex  flex-col gap-5"
            >
                <h1 className="text-center text-2xl font-mono font-bold p-3">
                    Add New Product
                </h1>
                <input
                    type="url"
                    className="p-3 rounded-lg"
                    placeholder="Image Link"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />
                <input
                    type="text"
                    className="p-3 rounded-lg"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <div className="w-full flex justify-between">
                    <input
                        type="text"
                        className="p-3 rounded-lg w-[48%]"
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                    <input
                        type="number"
                        className="p-3 rounded-lg w-[48%]"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <textarea
                    type="text"
                    rows={10}
                    className="p-3 rounded-lg"
                    placeholder="Enter product description here"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <button className="border-blue-400 hover:border-blue-500 border-2 text-blue-500 hover:scale-95 transition-all shadow-md text-center text-lg rounded-lg w-1/4 px-5 py-2">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
