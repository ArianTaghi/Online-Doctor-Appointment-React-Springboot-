import { useState, useEffect } from "react";
import IllCard from "./IllCard";

function SearchSectionUser() {
    const [currentList, setCurrentList] = useState([])
    const [searchText, setSearchText] = useState("");
    const token = localStorage.getItem("token")
  useEffect(() => {
    loadList()  
  }, []);
    
  const loadList = () => {
  console.log(localStorage.getItem("token"))
  console.log('er')
  
  console.log("searchText:", searchText);
    searchText.trim() === ""
      ? 
        fetch("http://localhost:8080/ill/admin/getList", {
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
      .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch ills");
        }
        return response.json();
      })
      .then(data => {
        console.log("USERS FROM BACKEND:", data);
        
          setCurrentList(data);
      })
      :
        fetch(`http://localhost:8080/ill/admin/search/byusername/${searchText}`, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
        })
      .then(response => {
        if (!response.ok) {
            throw new Error("Failed to search ills");
        }
        return response.json();
      })
      .then(data => {
          setCurrentList(data);
        });
  }
  return (
    <div className="search-section">
        <div className="search-box">
          <input
            className="search-bar" placeholder="Search for a ill" value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                loadList();
          }}
          />
                    
          <button className="search-button" onClick={loadList}>Search</button>
        </div>
        <div className="result-box">
          {currentList.map((ill) =>(
            <IllCard
              key={ill.username}
              ill={ill}
              path={`/admin/user/${ill.id}`}
            />
          ))}            
        </div>
      </div>
      );
}
export default SearchSectionUser;