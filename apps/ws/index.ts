import { User, Todo } from "db/db"; // Import from your db package

Bun.serve({
    port: 8083,
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            try {
                // Create a new user
                const newUser = await User.create({
                    name: `User_${Math.random().toString(36).substring(7)}`,
                    age: Math.floor(Math.random() * 50) + 18, // Random age between 18-67
                    email: `user_${Math.random().toString(36).substring(7)}@example.com`,
                    todos: [] // Start with empty todos array
                });

                console.log("User created:", newUser._id);

                // Optionally create a todo for the user
                const newTodo = await Todo.create({
                    task: `Task from WebSocket: ${message}`,
                    done: false,
                    user: newUser._id,
                    createdAt: new Date()
                });

                // Update user to include the todo reference
                await User.findByIdAndUpdate(
                    newUser._id,
                    { $push: { todos: newTodo._id } }
                );

                console.log("Todo created:", newTodo._id);

                // Send response back
                ws.send(JSON.stringify({
                    type: "user_created",
                    user: newUser,
                    todo: newTodo,
                    originalMessage: message
                }));

            } catch (error) {
                console.error("Error creating user/todo:", error);
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Failed to create user/todo",
                    error: error.message
                }));
            }
        },
        open(ws) {
            console.log("WebSocket connection opened");
            ws.send(JSON.stringify({
                type: "connection",
                message: "Connected to WebSocket server"
            }));
        },
        close(ws) {
            console.log("WebSocket connection closed");
        },
        error(ws, error) {
            console.error("WebSocket error:", error);
        }
    },
});

console.log("WebSocket server running on port 8083");