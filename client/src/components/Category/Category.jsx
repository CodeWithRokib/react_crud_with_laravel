import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Category = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/category')
        .then((response)=>{
            setData(response.data);
            // console.log(response)
        }).catch((response)=>{
            console.log(response);
        })
    },[])

  return (
    
        <div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                      {
                        data && data.map((value,key)=>(
                            <tr key={key}>
                                <td>{value.id}</td>
                                <td>{value.title}</td>
                                <td>{value.description}</td>
                                <td> <img width="50px" src={`http://localhost:8000/storage/product/image/${value.image}`} /></td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            
                        )
                        )
                      }
                      
                </tbody>
            </table>
        </div>
    
  )
}

export default Category
