import './App.css';
import MapBoxGL from "./MapBoxGL";
import SearchBar from "./SearchBar";
import StreetViewSideBar from "./StreetViewSideBar";

function App() {
  return (
    <div className="App">
        <MapBoxGL/>
        <SearchBar/>
        <StreetViewSideBar/>
    </div>
  );
}

export default App;
