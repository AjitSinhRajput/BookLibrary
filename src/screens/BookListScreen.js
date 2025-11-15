import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useLibrary } from "../context/LibraryContext";

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { borrowedBooks } = useLibrary();

  useEffect(() => {
    const booksRef = ref(db, "books");

    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formatted = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBooks(formatted);
      } else {
        setBooks([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => {
    const isBorrowed = borrowedBooks.some((b) => b.id === item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("BookDetails", { book: item })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.meta}>
          {item.genre} • {item.year}
        </Text>

        {isBorrowed && <Text style={styles.badge}>Borrowed</Text>}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default BookListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    marginBottom: 14,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "700" },
  author: { fontSize: 15, color: "#555" },
  meta: { fontSize: 13, color: "#777", marginTop: 3 },
  badge: {
    backgroundColor: "#2563EB",
    color: "white",
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
    fontSize: 12,
  },
});
