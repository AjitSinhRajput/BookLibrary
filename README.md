# 📚 BookLibrary

A React Native mobile application that allows users to browse books, view details, and borrow them for reading.  
Built using **React Native**, **Firebase Realtime Database**, **React Navigation**, and **Context API**.

---

## 🚀 Features

### **1. Book Listing Screen**
- Fetches books from **Firebase Realtime Database**
- Shows book title, author, genre, and year
- Tap any book to open **Book Details**

### **2. Book Details Screen**
- Displays full details of the selected book
- Borrow or return a book
- **Borrowing limit:** Max **3 books**
- Warning message displayed when limit exceeded

### **3. Borrowed Books Screen**
- List of all borrowed books
- Return books individually
- If last borrowed book is returned → navigates to main borrowed list

### **4. Bottom Tab Navigation**
- Two bottom tabs:
  - **Books** (Book list + Details)
  - **Borrowed** (Borrowed list + Details)
- Header title: **Book Library** (centered)

### **5. State Management**
- Uses **Context API**
- Borrow/return updates UI instantly

### **6. Firebase Integration**
- Books stored in **Realtime Database**
- Live syncing — updates reflect immediately

---

## 🔧 Tech Stack

| Area | Technology |
|------|------------|
| Mobile Framework | React Native (Expo) |
| Navigation | React Navigation (Stack + Tabs) |
| Database | Firebase Realtime Database |
| State Management | Context API |
| Language | JavaScript |
| Icons | Ionicons (Expo Vector Icons) |



