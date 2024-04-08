import React, { useContext } from "react";
import { ProductsContext } from "../Utils/Context";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";

function Navbar() {
    const [products] = useContext(ProductsContext);

    // For filtering the products category list
    let category =
        products && products.reduce((acc, cv) => [...acc, cv.category], []);
    category = [...new Set(category)];

    // returns the dynamic color values
    const color = () => {
        return `rgba(${(Math.random() * 255).toFixed()}, ${(
            Math.random() * 255
        ).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.9)`;
    };

    return (
        <nav className="w-[20%] h-full bg-zinc-100 pt-10 flex flex-col items-center">
            <Link to="/" className="flex items-center justify-center gap-2">
                <IoIosHome className="text-lg text-blue-600" />
                <h4 className="text-lg text-blue-500">Home</h4>
            </Link>
            <hr className="w-[80%] h-[2px] my-5 bg-black" />
            <Link
                className="px-4 py-2 rounded-lg text-red-500 border border-red-700"
                to="/create"
            >
                Add new Product
            </Link>
            <hr className="w-[80%] h-[2px] my-4 bg-black" />
            <h1 className="w-[80%] text-lg font-mono mb-5">Category Filter</h1>
            <div className="w-[80%] text-center text-base rounded-md">
                {category.map((cat, index) => (
                    <Link
                        key={index}
                        to={`/?category=${cat}`}
                        className="flex items-center text-md mb-2 hover:text-lg hover:text-blue-500 hover:font-semibold transition-all"
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
