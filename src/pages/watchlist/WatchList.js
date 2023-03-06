import React, { useEffect, useState } from "react";
import "./WatchList.css";
const WatchList = () => {
  const [watchlist, setWatchList] = useState([]);

  // this function will get the data from local storage
  const displayDeletedData = () => {
    const watchlistData = JSON.parse(localStorage.getItem("watchlist"));
    setWatchList(watchlistData);
  };

  // remove from watchlist button handler
  // this function will result items available in watchist after deletion
  const removeFromWatchlistHandler = (id) => {
    const filteredData = JSON.parse(localStorage.getItem("watchlist")).filter(
      (item) => {
        return item.id !== id;
      }
    );
    localStorage.setItem("watchlist", JSON.stringify(filteredData));
    displayDeletedData();
  };

  useEffect(() => {
    displayDeletedData();
  }, []);

  return (
    <div>
      {/* checking if watchlist is empty or not  */}
      {watchlist.length === 0 ? (
        <div className="watchlist-empty">
          Your watchlist is empty please add something !
        </div>
      ) : (
        <div className="watchlist">Here is your watchlist .</div>
      )}

      <div className="watchlist-parent">
        <div className={watchlist.length > 0 ? "watchlist-container" : ""}>
          {watchlist.length !== 0 ? (
            <div className="parent-watchlist ">
              <div className="watchlist-name">
                <p className="watchlist-item"> Company name</p>
              </div>
              <div className="watchlist-name">
                <p className="watchlist-item">
                  {" "}
                  <span className="mobile-view">Current</span>share Price
                </p>
              </div>
              <div className="watchlist-name">
                <p className="watchlist-item">Remove from Watchlist</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* rendering the items available in watchlist  */}
          {watchlist.map((item, index) => {
            return (
              <div key={index} className="child-container">
                <div className="bodyItem name">
                  <p>{item.nameOfCompany}</p>
                </div>
                <div className="bodyItem name">
                  <p>{item.sharePrice}</p>
                </div>
                <div className="bodyItem name">
                  <button
                    className="add-btn"
                    onClick={() => removeFromWatchlistHandler(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default WatchList;
