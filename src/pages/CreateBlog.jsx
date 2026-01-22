import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBlog } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CreateBlog = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
    });

    const mutation = useMutation({
        mutationFn: (newBlog) => createBlog(newBlog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            navigate("/");
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = {
            ...formData,
            category: formData.category.split(",").map((c) => c.trim().toUpperCase()),
            date: new Date().toISOString(),
        };
        mutation.mutate(blogData);
    };

    return (
        <div className="min-h-full p-4 md:p-8 flex items-center justify-center bg-muted/20">
            <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary animate-in zoom-in-95 duration-300">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
                        Write a New Story <Sparkles className="w-5 h-5 text-yellow-500" />
                    </CardTitle>
                    <CardDescription>
                        Share your insights with the CA Monk community.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Blog Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter an engaging title..."
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="text-lg font-medium"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Categories (comma separated)</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="e.g. FINANCE, TECH, AUDIT"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="coverImage">Cover Image URL</Label>
                                <div className="relative">
                                    <Input
                                        id="coverImage"
                                        name="coverImage"
                                        placeholder="https://..."
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                        className="pl-9"
                                    />
                                    <ImageIcon className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="A brief summary to hook readers..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Full Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Start writing your masterpiece..."
                                value={formData.content}
                                onChange={handleChange}
                                required
                                className="min-h-[200px] font-mono text-sm leading-relaxed"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4 border-t pt-6 bg-muted/10">
                        <Button type="button" variant="ghost" onClick={() => navigate("/")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending} className="min-w-[120px]">
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing
                                </>
                            ) : (
                                "Publish Post"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default CreateBlog;
