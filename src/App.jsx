import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Producto} from "./components/Producto.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Producto/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
