import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSubmit = (e) => {
    console.log(searchValue);
    e.preventDefault();
    if (!searchValue) return;
    let params = { search: searchValue };
    navigate({
      pathname: '/shop',
      search: `?${createSearchParams(params)}`,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" onChange={handleChange} placeholder="Search..."/>
      <button type="submit">S</button>
    </form>
  )
}

export default Search;
