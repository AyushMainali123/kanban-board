import { Task } from "../task";

interface ITasksContainer {
    tasks: string[];
}

export function TasksContainer({tasks}: ITasksContainer) {
    return (
        <ul className="py-4 flex flex-col gap-4">
            {tasks.map(task => (
                <Task id={task} title={"Hello"} key={task}  />
            ))}
        </ul>
    )
}