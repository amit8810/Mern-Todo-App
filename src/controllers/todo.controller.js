import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createTodo = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content) {
        throw new ApiError(400, "Content is missing");
    }

    const todo = await Todo.create({
        content
    })

    const createdTodo = await Todo.findById(todo._id);
    if (!createdTodo) {
        throw new ApiError(500, "Something went wrong while creating Todo")
    }

    return res
    .status(201)
    .json( new ApiResponse(200, todo, "Todo is created successfully"))
})

const getAllTodos = asyncHandler(async (req, res) => {    

    const todos = await Todo.find()

    return res
    .status(200)
    .json(new ApiResponse(200, todos, "All Todos fetched Sucessfully"))
})

const updateTodo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    await Todo.findByIdAndUpdate(
        {
            _id: id
        },
        {
            content,
            updatedAt: Date.now()
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200,{}, "Todo updated successfully"))
})

const deleteTodo = asyncHandler(async (req, res) => {
    const id =  req.params.id;


    await Todo.findByIdAndDelete({_id: id})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todo Deleted Successfully"))
})

export { 
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo
}