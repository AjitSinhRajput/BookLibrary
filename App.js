import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { LibraryProvider } from "./src/context/LibraryContext";
import BookListScreen from "./src/screens/BookListScreen";
import BookDetailsScreen from "./src/screens/BookDetailsScreen";
import BorrowedBooksScreen from "./src/screens/BorrowedBooksScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------------- BOOKS STACK ---------------------- */
function BooksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookList"
        component={BookListScreen}
        options={{
          title: "Book Library",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          title: "Book Library",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------------------- BORROWED STACK ---------------------- */
function BorrowedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BorrowedList"
        component={BorrowedBooksScreen}
        options={{
          title: "Book Library",
          headerTitleAlign: "center",
        }}
      />

      {/* IMPORTANT: Add BookDetails here so Borrowed → Details works */}
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          title: "Book Library",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

/* ---------------------- BOTTOM TABS ---------------------- */
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          height: 75,
          paddingBottom: 12,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#999",

        tabBarIcon: ({ color }) => {
          if (route.name === "BooksTab") {
            return <Ionicons name="book" size={30} color={color} />;
          }
          if (route.name === "BorrowedTab") {
            return <Ionicons name="bookmark" size={30} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="BooksTab"
        component={BooksStack}
        options={{ title: "Books" }}
      />

      <Tab.Screen
        name="BorrowedTab"
        component={BorrowedStack}
        options={{ title: "Borrowed" }}
      />
    </Tab.Navigator>
  );
}

/* ---------------------- APP ROOT ---------------------- */
export default function App() {
  return (
    <LibraryProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </LibraryProvider>
  );
}
