import React, { useContext } from "react";
import { ProductsContext } from "../Utils/Context";
import { Link } from "react-router-dom";

function Navbar() {
    const [products] = useContext(ProductsContext);

    let category =
        products && products.reduce((acc, cv) => [...acc, cv.category], []);
    category = [...new Set(category)];

    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()}, ${(
            Math.random() * 255
        ).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.9)`;
    };
    console.log(color);

    return (
        <nav className="w-[20%] h-full bg-zinc-100 pt-10 flex flex-col items-center">
            <a
                className="px-4 py-2 rounded-lg text-red-500 border border-red-700"
                href="/create"
            >
                Add new Product
            </a>
            <hr className="w-[80%] h-[2px] my-4 bg-black" />
            <h1 className="w-[80%] text-lg font-mono mb-5">Category Filter</h1>
            <div className="w-[80%] text-center text-base rounded-md">
                {category.map((cat, index) => (
                    <Link
                        key={index}
                        to={`/?category=${cat}`}
                        className="flex items-center text-md mb-2"
                    >
                        <span
                            style={{ backgroundColor: color() }}
                            className="w-[16px] h-[16px] rounded-full mr-3"
                        ></span>
                        {cat}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
