import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Details from "./Components/Details";
import AddProduct from "./Components/AddProduct";
import Edit from "./Components/Edit";

function App() {
    return (
        <>
            <div className="w-screen h-screen flex">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/create" element={<AddProduct />}></Route>
                    <Route path="/Details/:id" element={<Details />}></Route>
                    <Route path="/edit/:id" element={<Edit />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
