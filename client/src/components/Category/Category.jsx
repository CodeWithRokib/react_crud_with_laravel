import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Category = () => {

    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    

    useEffect(()=>{
        axios.get('http://localhost:8000/api/category')
        .then((response)=>{
            setData(response.data);
            // console.log(response)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };
    
      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };
    
      const handleSubmit = async () => {
        if (!title || !description || !image) {
          console.error('Please fill in all fields');
          return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
    
        const uploadURL = 'http://localhost:8000/api/category';
    
        await axios.post(uploadURL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log('Data uploaded successfully:', response.data);
          // Handle the response after successful upload
        })
        .catch(error => {
          console.error('Error uploading data:', error);
          // Handle errors if the upload fails
        });
      };
    
    
 

  return (
    
        <div className='container'>
                <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                <textarea placeholder="Description" value={description} onChange={handleDescriptionChange} />
                <input type="file" onChange={handleImageChange} />
                <button onClick={handleSubmit}>Submit</button>
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
