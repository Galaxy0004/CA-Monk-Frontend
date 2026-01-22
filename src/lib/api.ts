import axios from "axios";

export interface Blog {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type NewBlog = Omit<Blog, "id">;

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>("/blogs");
    return response.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (newBlog: NewBlog): Promise<Blog> => {
    const response = await api.post<Blog>("/blogs", newBlog);
    return response.data;
};
