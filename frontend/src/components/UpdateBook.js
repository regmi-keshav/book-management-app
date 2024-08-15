// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const UpdateBook = () => {
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [publishedDate, setPublishedDate] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/books/${id}`)
//       .then((response) => {
//         const book = response.data;
//         setTitle(book.title);
//         setAuthor(book.author);
//         setPublishedDate(book.published_date);
//         setDescription(book.description);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the book!", error);
//       });
//   }, [id]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .put(`http://127.0.0.1:8000/books/${id}`, {
//         title: title,
//         author: author,
//         published_date: publishedDate,
//         description: description,
//       })
//       .then((response) => {
//         alert("Book updated successfully!");
//       })
//       .catch((error) => {
//         console.error("There was an error updating the book!", error);
//       });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Update Book</h1>
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Author
//           </label>
//           <input
//             type="text"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Published Date
//           </label>
//           <input
//             type="date"
//             value={publishedDate}
//             onChange={(e) => setPublishedDate(e.target.value)}
//             className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//             required
//           ></textarea>
//         </div>
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateBook;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookPage = () => {
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    publishedDate: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/books/${id}`)
      .then((response) => {
        const book = response.data;
        setFormState({
          title: book.title,
          author: book.author,
          publishedDate: book.published_date,
          description: book.description,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the book details!", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, author, publishedDate, description } = formState;

    const bookData = {
      title,
      author,
      published_date: publishedDate,
      description,
    };

    axios
      .put(`http://127.0.0.1:8000/books/${id}`, bookData)
      .then((response) => {
        alert("Book updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error updating the book!", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Update Book</h1>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formState.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Published Date
            </label>
            <input
              type="date"
              name="publishedDate"
              value={formState.publishedDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookPage;
