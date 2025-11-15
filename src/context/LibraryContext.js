import React, { createContext, useState, useContext } from "react";
import { Alert } from "react-native";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.some((b) => b.id === book.id)) {
      Alert.alert("Already Borrowed", "You already borrowed this book.");
      return;
    }

    if (borrowedBooks.length >= 3) {
      Alert.alert("Limit Reached", "You can only borrow up to 3 books.");
      return;
    }

    setBorrowedBooks((prev) => [...prev, book]);
    Alert.alert("Borrowed", `"${book.title}" added to borrowed list.`);
  };

  const returnBook = (id) => {
    setBorrowedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <LibraryContext.Provider value={{ borrowedBooks, borrowBook, returnBook }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
