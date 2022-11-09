import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';



type TodolistType={
    id: string,
    title: string
}

type TasksStateType={
    [key:string]: InTasksType
}

type InTasksType={
    data:DataType[]
    filter:FilterValuesType
}

type DataType={
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");


    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn"},
        {id: todolistId2, title: "What to buy"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]:{
            data:[
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "all"
        } ,
        [todolistId2]:{
            data:[
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "all"
        }
    });

    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], data: tasks[todolistID].data.filter(el => el.id !== taskId)}})
    }
    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], data: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID].data]}})
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], data: tasks[todolistID].data.map(el => el.id === taskId ? {...el, isDone: isDone} : el)}})
    }

    // let tasksForTodolist = tasks;
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], filter: value}});
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !==todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {todolists.map(el=>{
                let tasksForTodolist = tasks[el.id].data;
                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return(
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tasks[el.id].filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
