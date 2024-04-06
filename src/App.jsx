import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Details from "./Components/Details";

function App() {
    return (
        <>
            <div className="w-screen h-screen flex">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/Details/:id" element={<Details />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
