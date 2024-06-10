import React from 'react'
import { Collection } from "../collection";
import "../styles/Home.css"
import { Link } from 'react-router-dom';
import {useKindeAuth} from "@kinde-oss/kinde-auth-react";

const cats = [
  {name: "All"},
  {name: "Pizzerias"},
  {name: "Sushare"},
];

export const Home = () => {

  const { login, register } = useKindeAuth();

  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(true);

  React.useEffect(() =>{
    
    setisLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://6627b43cb625bf088c0965f3.mockapi.io/delcol?page=${page}&limit=6&${
        category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      }).finally(()=> setisLoading(false));
    }, [categoryId, page]);

    const filteredCollections = collections.filter((obj) =>
      obj.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );

  return (
    <div className='pageone'>
      <div className='header'>
        <div className='headercont'>
           <Link to="/" className='navlink'>
               <h3>Delivery</h3>
            </Link>
          <input 
                    className='search-input'
                    placeholder='Search'
                    value={searchValue}
                    onChange={(e)=> setSearchValue(e.target.value)}
                  />
            <Link to="/api" className='autht'>
                Login
            </Link>
            
        </div>
        </div>
        <div className='main'>
          <h1>Restaurants</h1>
          <ul className="tags">
            {cats.map((obj, i)=> (
              <li 
                onClick={()=> setCategoryId(i)}
                className={categoryId === i ? "active" : ""}
                key={obj.name}
              >
                {obj.name}
              </li>
            ))}
          </ul>
          <div className='content'>
           {
            isLoading ? (
              <h2>Wait</h2> 
            ) : (
              filteredCollections.map((obj,index) => (
                <div className='divcol'>
                  <Link to="ress" className='navlink'>
                    <Collection
                    key={index}
                    name={obj.name}
                    images={obj.photos}
                      />
                      
                  </Link>
                </div>
              ))
            )
           }
        </div>
        <ul className="pagination">
        {
          [...Array(2)].map((_, i)=>(
            <li onClick={()=> setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
          ))
        }
      </ul>
        </div>
    </div>
  )
}
