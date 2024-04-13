import CategoryBar from "./Components/CategoryBar/CategoryBar";
import NavBar from "./Components/NavBar/NavBar"
import ProductList from "./Components/ProductList/ProductList";
function App() {
  return (
    <div className="App">
      <NavBar/>
      <CategoryBar/>
      <ProductList/>
    </div>
  );
}

export default App;
