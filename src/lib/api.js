import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const getBlogs = async () => {
    const response = await api.get("/blogs");
    return response.data;
};

export const getBlog = async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (newBlog) => {
    const response = await api.post("/blogs", newBlog);
    return response.data;
};
