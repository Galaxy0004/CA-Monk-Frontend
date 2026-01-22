import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBlog } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const BlogDetail = () => {
    const { id } = useParams();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: () => getBlog(id),
        enabled: !!id,
    });

    if (!id) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold">Select a blog to read</h2>
                <p className="max-w-xs mt-2">Choose an article from the list to view its full content and details.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-8 space-y-6 max-w-4xl mx-auto h-full overflow-y-auto">
                <Skeleton className="w-full aspect-video rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center text-destructive">
                Error loading blog details.
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-background/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="relative w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[21/9] overflow-hidden group">
                    <img
                        src={blog.coverImage || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg"}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                    <div className="absolute top-4 left-4 md:hidden">
                        <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background transition-colors">
                            <MoveLeft className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <div className="p-8 space-y-8 -mt-20 relative z-10">
                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {blog.category?.map((cat) => (
                                <span key={cat} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{blog.title}</h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-8">
                            <div className="flex items-center gap-2">
                                <span>{new Date(blog.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <span>•</span>
                            <span>{Math.ceil((blog.content + blog.description).split(/\s+/).length / 200)} min read</span>
                        </div>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="lead text-xl text-muted-foreground mb-8 font-light italic border-l-4 pl-4 border-primary/50">
                            {blog.description}
                        </p>
                        <div className="whitespace-pre-line text-lg leading-relaxed">
                            {blog.content}
                        </div>
                    </div>

                    <div className="pt-8 border-t flex gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                        {blog.category?.map(tag => (
                            <span key={tag} className="text-sm text-primary hover:underline cursor-pointer">#{tag.toLowerCase()}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
