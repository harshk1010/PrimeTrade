import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "../styles/DashboardStyles.css";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");

    // Edit modal states
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // Fetch tasks
    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            console.log("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Create task
    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            await axiosInstance.post("/tasks", {
                title,
                description
            });

            setTitle("");
            setDescription("");
            fetchTasks();
        } catch (err) {
            console.log("Error creating task:", err);
        }
    };

    // Delete task
    const handleDelete = async (_id) => {
        try {
            await axiosInstance.delete(`/tasks/${_id}`);
            fetchTasks();
        } catch (err) {
            console.log("Error deleting task:", err);
        }
    };

    // Update task
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/tasks/${editId}`, {
                title: editTitle,
                description: editDescription
            });

            setIsEditOpen(false);
            setEditId(null);
            fetchTasks();
        } catch (err) {
            console.log("Error updating task:", err);
        }
    };

    // Search filter
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

  const openEditModal = (task) => {
    console.log("EDIT TASK ID:", task._id); // debug
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditOpen(true);
};

    return (
        <div className="dash-container">
            <div className="dashboard-content-area">
                <h1 className="dash-title">Your Dashboard</h1>

                <div className="task-form-card">
                    <h2 className="card-title">Add New Task</h2>

                    <form onSubmit={handleCreateTask} className="task-form">
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="input-field"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Task Description (optional)"
                            className="textarea-field"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button type="submit" className="submit-btn">
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="task-list-card">
                    <div className="task-list-header">
                        <h2 className="card-title">Your Tasks</h2>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="search-field"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="task-list">
                        {filteredTasks.length === 0 ? (
                            <p className="no-tasks">No tasks found...</p>
                        ) : (
                            filteredTasks.map((task) => (
                                <div key={task._id} className="task-card">
                                    <div className="task-info">
                                        <h3 className="task-title">{task.title}</h3>
                                        {task.description && (
                                            <p className="task-desc">{task.description}</p>
                                        )}
                                    </div>

                                    <button
                                        className="task-edit-btn"
                                        onClick={() => openEditModal(task)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(task._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {isEditOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3>Edit Task</h3>

                        <form onSubmit={handleUpdateTask} className="modal-form">
                            <label>Title</label>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                required
                            />

                            <label>Description</label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />

                            <div className="modal-buttons">
                                <button type="submit" className="update-btn">
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setIsEditOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
