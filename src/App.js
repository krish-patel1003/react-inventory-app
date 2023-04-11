import { useState, useEffect } from "react";
import styles from "./App.module.css";
import SearchBar from "./SearchBar";
import AddItem from "./AddItem";
import ItemDisplay from "./ItemsDisplay";
import Test from "./Class";

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({ items: [] });
  // const [showTest ,setShowTest] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setData({ items: data }));
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = (item) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:3000/items/${item.id}`, requestOptions).then(
      (res) => {
        if (res.ok) {
          const idx = items.indexOf(item);
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  };

  const addItemToData = (item) => {
    let items = data["items"];
    // item.id = items.length;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:3000/items", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        items.push(data);
        setData({ items: items });
      });

    // console.log(data);
  };

  const filterData = (data) => {
    const filteredData = [];

    if (!filters.name) {
      return data;
    }
    console.log("data", data);
    for (const item of data) {
      if (filters.name !== "" && item.name !== filters.name) {
        console.log("name match");
        continue;
      }
      if (filters.price !== 0 && item.price > filters.price) {
        console.log("price matched");
        continue;
      }
      if (filters.type !== "" && item.type !== filters.type) {
        console.log("type matched");

        continue;
      }
      if (filters.brand !== "" && item.brand !== filters.brand) {
        console.log("brand matched");

        continue;
      }

      filteredData.push(item);
      console.log("filteredData", filteredData);
    }

    return filteredData;
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <ItemDisplay
          deleteItem={deleteItem}
          items={filterData(data["items"])}
        />
      </div>

      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>

      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
      {/* <div className="row mt-3">
        {showTest ? <Test destroy={setShowTest}/> : null}
      </div> */}
    </div>
  );
}

export default App;
