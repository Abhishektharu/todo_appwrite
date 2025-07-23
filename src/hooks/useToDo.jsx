import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";


export function useToDo(){
    return useContext(TodoContext)
}