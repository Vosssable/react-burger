import React from 'react';
import './App.css';
import AppHeader from "../components/header/AppHeader/AppHeader";
import AppBody from "../components/body/AppBody/AppBody";

function App() {
    return (
        <>
            <header>
                <AppHeader/>
            </header>
            <main>
                <AppBody/>
            </main>
        </>
    )
}

export default App;
