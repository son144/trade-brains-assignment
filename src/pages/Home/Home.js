import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";
function Home() {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState([]);

  // add button handler
  const addToWatchlistHandler = (info) => {
    let watchlistData = JSON.parse(localStorage.getItem("watchlist")) || [];
    const removeDuplicates = watchlistData.find((item) => item.id === info.id);
    if (!!removeDuplicates) {
      alert("already added");
    } else {
      watchlistData.unshift(info);
      localStorage.setItem("watchlist", JSON.stringify(watchlistData));
      alert("added to watchlist ");
    }
  };

  async function fetcher() {
    const keyAlpha = "U7865K4YQ73715B8";
    const keyFinn = "cg24m49r01qibiilkh7gcg24m49r01qibiilkh80";
    try {
      let response = await axios.get(
        // this  is alphavantage api is used to fetch the company names .
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${keyAlpha}`
      );

      let matches = response.data.bestMatches;
      let data = [];
      for (let i = 0; i < matches.length; i++) {
        let symbol = matches[i]["1. symbol"];
        if (!symbol.includes(".")) {
          let stockData = await axios.get(
            // this  is finnhub api is used to fetch the current share price of company name .
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${keyFinn}`
          );
          data.push({
            id: stockData.data.t,
            name: matches[i]["2. name"],
            price: stockData.data.c,
          });
        }
      }
      setStocks(data);
    } catch (err) {
      console.log("erron in fetching data", err);
    }
  }

  useEffect(() => {
    if (search !== "") {
      fetcher();
    }
  }, [search]);

  return (
    <div className="App">
      <div className="label1">
        <label>Search here for listed company names: </label>
      </div>
      <input
        className="inputBox"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter company name..."
      />
      {stocks.length !== 0 ? (
        <div className="parent-card">
          <div className="bodyItem name">
            <p className="header-item"> Company Name</p>
          </div>
          <div className="bodyItem">
            <p className="header-item">
              {" "}
              <span className="mobile-view">Current</span>share Price
            </p>
          </div>
          <div className="bodyItem">
            <p className="header-item">Add to Watchlist</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* rendering the matche results  on search */}
      <div className="stockCard">
        {stocks.map((stock, index) => {
          return (
            <div key={index} className="card">
              <div className="bodyItem name">
                <p>{stock.name}</p>
              </div>
              <div className="bodyItem">
                <p>{stock.price}</p>
              </div>
              <div className="bodyItem">
                <button
                  className="add-btn"
                  onClick={() =>
                    addToWatchlistHandler({
                      id: stock.id,
                      nameOfCompany: stock.name,
                      sharePrice: stock.price,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Home;
