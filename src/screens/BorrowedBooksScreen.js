import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLibrary } from "../context/LibraryContext";

const BorrowedBooksScreen = ({ navigation }) => {
  const { borrowedBooks, returnBook } = useLibrary();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>{item.author}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.detailsBtn}
          onPress={() => navigation.navigate("BookDetails", { book: item })}
        >
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.returnBtn}
          onPress={() => returnBook(item.id)}
        >
          <Text style={styles.returnText}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {borrowedBooks.length === 0 ? (
        <Text style={styles.empty}>No borrowed books.</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default BorrowedBooksScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { marginTop: 50, textAlign: "center", fontSize: 16 },
  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 10,
    marginBottom: 14,
    elevation: 2,
  },
  title: { fontSize: 20, fontWeight: "700" },
  meta: { marginTop: 6, color: "#777" },
  row: { flexDirection: "row", marginTop: 14, justifyContent: "flex-end" },
  detailsBtn: {
    borderWidth: 1,
    borderColor: "#2563EB",
    padding: 8,
    borderRadius: 6,
    marginRight: 12,
  },
  detailsText: { color: "#2563EB", fontWeight: "600" },
  returnBtn: {
    backgroundColor: "#DC2626",
    padding: 8,
    borderRadius: 6,
  },
  returnText: { color: "#FFF", fontWeight: "600" },
});
