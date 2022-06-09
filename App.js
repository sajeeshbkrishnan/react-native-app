import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Adduser from "./components/adduser";

export default function App() {
  const [isSearch, setIsSearch] = useState(true);
  // Loading the user data from database on loading
  useEffect(() => {
    if (isSearch == true) {
      getUsersFromDB();
    }
  });

  const [users, setUsers] = useState([]);
// Function for getting data from DB using API call
  const getUsersFromDB = () => {
    fetch("http://localhost:52595/api/User/")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error));
  };
// Function for searching for a user by ID using API call
  const SearchUserFromDB = (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:52595/api/User/" + id, requestOptions)
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error));
  };

  const [id, setId] = useState("");
  const SearchID = (val) => {
    setId(val);
  };

  // Function for deleting a user from DB using an API call
  const DeleteUserFromDB = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("http://localhost:52595/api/User/" + id, requestOptions)
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error));
      // loading the updated data after deletion
    getUsersFromDB();
  };

  // function for saving data to DB using API call
  const submitHandler = (name, address, email) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        UserName: name,
        UserAddres: address,
        UserEmail: email,
      }),
    };

    fetch("http://localhost:52595/api/User/", requestOptions)
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch((error) => console.error(error));
// function call to load fresh data
    getUsersFromDB();
  };

  return ( 
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
      
        <Adduser submitHandler={submitHandler} />
        <TextInput placeholder="Enter USerID" onChangeText={SearchID} />

        <Button
          style={styles.btn}
          title="SEARCH USER"
          color="green"
          onPress={() => {
            setIsSearch(false);
            SearchUserFromDB(id);
          }}
        />
      </View>
      <Text style={styles.listtitle}>List of Users</Text>
      <View style={{ padding: 20 }}>
        <Text style={{ color: "black",fontWeight:700 }}> ID                      NAME                       ADDRESS                     EMAIL</Text>
        <FlatList
          data={users}
          keyExtractor={({ UserID }) => UserID.toString()}
          renderItem={({ item }) => (
            <View style={styles.display}>
              <Text>
                {item.UserID}                  {item.UserName}                          {item.UserAddress},                              {item.UserEmail}
              </Text>
              <TouchableOpacity
                style={{ color: "red" }}
                onPress={() => DeleteUserFromDB(item.UserID)}
              >
                Delete
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  display: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "skyblue",
    color: "blue",
  },
  listtitle: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
