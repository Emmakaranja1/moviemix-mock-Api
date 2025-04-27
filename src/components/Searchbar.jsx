import React from 'react'

const Searchbar = () => {
    const [search, setSearch] = React.useState('');
    const handleSearch =() =>{
        console.log(search);
    }
  return (
    <div className="search-bar">
        <input 
            type="text" 
            placeholder="Search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Searchbar