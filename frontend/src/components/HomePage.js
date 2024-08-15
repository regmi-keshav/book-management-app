import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    publishedDate: "",
    description: "",
    editMode: false,
    currentBookId: null,
  });
  const navigate = useNavigate();
  const { id } = useParams(); // for updating a book

  // Fetch books on component mount
  const fetchBooks = () => {
    axios
      .get("http://127.0.0.1:8000/books/")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the books!", error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch book details if in edit mode
  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/books/${id}`)
        .then((response) => {
          const book = response.data;
          setFormState({
            ...formState,
            title: book.title,
            author: book.author,
            publishedDate: book.published_date,
            description: book.description,
            editMode: true,
            currentBookId: book.id,
          });
        })
        .catch((error) => {
          console.error("There was an error fetching the book details!", error);
        });
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      author,
      publishedDate,
      description,
      editMode,
      currentBookId,
    } = formState;

    const bookData = {
      title,
      author,
      published_date: publishedDate,
      description,
    };

    if (editMode) {
      axios
        .put(`http://127.0.0.1:8000/books/${currentBookId}`, bookData)
        .then((response) => {
          alert("Book updated successfully!");
          setFormState({
            title: "",
            author: "",
            publishedDate: "",
            description: "",
            editMode: false,
            currentBookId: null,
          });
          fetchBooks(); // Refresh the list of books
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error updating the book!", error);
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/books/", bookData)
        .then((response) => {
          alert("Book added successfully!");
          setFormState({
            title: "",
            author: "",
            publishedDate: "",
            description: "",
            editMode: false,
            currentBookId: null,
          });
          fetchBooks(); // Refresh the list of books
        })
        .catch((error) => {
          console.error("There was an error adding the book!", error);
        });
    }
  };

  // Handle book deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/books/${id}`)
      .then((response) => {
        setBooks(books.filter((book) => book.id !== id));
        alert("Book deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the book!", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Management</h1>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/add-book")}
          className="bg-green-500 hover:bg-green-700 text-white mb-3 font-bold py-2 px-6 rounded flex justify-center"
        >
          ADD BOOKS
        </button>
      </div>

      {books.length > 0 ? (
        <>
          {/* Book List */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="text-gray-700 mt-2">Author: {book.author}</p>
                <p className="text-gray-500 mt-1">
                  Published Date: {book.published_date}
                </p>
                <p className="text-gray-600 mt-4">{book.description}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => navigate(`/update-book/${book.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <p className="text-center text-gray-500 mb-4">
            No books available. Please add a new book.
          </p>

          {/* Book Form */}
          <h2 className="text-2xl font-semibold mb-4">
            {formState.editMode ? "Update Book" : "Add a New Book"}
          </h2>
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
                {formState.editMode ? "Update Book" : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
