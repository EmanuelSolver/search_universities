
import  { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [searchCountry, setSearchCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    // Fetch data from the API whenever the search query changes
    const fetchData = async () => {
      try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=${searchCountry}`);
        const data = await response.json();

        const universities  = {}
        data.forEach((university) => {
          const {country} = university

          if(!universities[country]){
            universities[country] = []

          }
          universities[country].push(university)

        })
        setSearchResults(universities);

      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchCountry]);

  const handleSearchChange = (e) => {

    const countryValue = e.target.value
    setSearchCountry(countryValue);
  }

  const handleClick = () =>{
        setSearch(!search);
  }

  return (
    <>
     <div>
      <input style={{height: "34px"}} id='country' placeholder="Enter country" type="text" value={searchCountry} onChange={handleSearchChange} />
      <button onClick={handleClick}>Search Campus</button>

      
    </div>

        
    <div style={{display:"flex", backgroundColor:"grey", marginTop:"20px"}}>
    <ul>
        {
          searchResults.map((result, index) => (
            
            <li key={index}>{result.country}</li>
            
          ))
        }
      </ul>
      </div>

    </>
   
  );
}

export default App