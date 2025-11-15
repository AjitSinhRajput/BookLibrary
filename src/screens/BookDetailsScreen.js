import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLibrary } from "../context/LibraryContext";

const BookDetailsScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { borrowedBooks, borrowBook, returnBook } = useLibrary();

  const isBorrowed = borrowedBooks.some((b) => b.id === book.id);

  const handleReturn = () => {
    returnBook(book.id);

    // If no books left => navigate back automatically
    if (borrowedBooks.length - 1 <= 0) {
      navigation.navigate("BorrowedList");
    } else {
      navigation.goBack(); // simply go back to borrowed list
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.meta}>
          {book.genre} • {book.year}
        </Text>

        <Text style={styles.description}>
          {book.description || "No description available."}
        </Text>

        <TouchableOpacity
          style={[styles.btn, isBorrowed ? styles.returnBtn : styles.borrowBtn]}
          onPress={() => (isBorrowed ? handleReturn() : borrowBook(book))}
        >
          <Text style={styles.btnText}>
            {isBorrowed ? "Return Book" : "Borrow Book"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 16, flexGrow: 1 },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: "700" },
  author: { fontSize: 18, color: "#444", marginVertical: 6 },
  meta: { fontSize: 14, color: "#666" },
  description: { marginTop: 18, fontSize: 16, lineHeight: 22 },
  btn: {
    marginTop: 24,
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  borrowBtn: { backgroundColor: "#2563EB" },
  returnBtn: { backgroundColor: "#DC2626" },
  btnText: { color: "#FFF", fontSize: 17, fontWeight: "700" },
});
