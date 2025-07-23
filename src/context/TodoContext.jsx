import { createContext, useEffect, useState } from "react";

import { databases } from "../appwrite/appwrite";

import { ID , Query} from "appwrite";
import conf from "../conf/conf";

export const TodoContext = createContext();

export function TodoProvider(props) {
  const [todos, setTodos] = useState([]);

  async function addToDo(todo) {
    try {
        const response = await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {id: ID.unique(),title: todo}
    );
     
    // setTodos((prevToDos)=>[response, ...prevToDos]);
    await getToDos(); // Refresh the list after adding a new todo
    return response;
    } catch (error) {
      console.error("Error adding todo:", error);
        
    }
  }

  async function getToDos(){
    try {
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.orderDesc("$createdAt")]
      );
      // console.log(response.documents);
      setTodos(response.documents);
    } catch (error) {
      console.error("Error fetching todos:", error);
      
    }
  }

  async function removeToDo(id) {
    try {
      const res = await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
      await getToDos(); // Refresh the list after removing a todo
      return res;
      
    } catch (error) {
      console.error("Error removing todo:", error);
      
    }
  }

  useEffect(()=>{
    getToDos();
  }, [])

  return (
    <TodoContext.Provider value= {{todos, addToDo, getToDos, removeToDo}}>
      {props.children}
    </TodoContext.Provider>
  )
}
