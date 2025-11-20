interface ITask {
    id: string;
    title: string;
    description?: string;
}

export function Task({id, title}: ITask) {
    return (
        <li className="bg-gray-700 text-white rounded-sm py-3 px-4">
            {title} - {id}
        </li>
    )
}