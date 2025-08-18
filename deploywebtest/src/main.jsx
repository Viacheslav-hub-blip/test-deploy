import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import StreamComponent from "./llm_streaming_test.jsx"
import AuthPage from "./my_page.jsx";


function App() {
    return (
        <>

            {/*<Header/>*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage/>}/>
                    <Route path="/chat" element={<StreamComponent/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
)
