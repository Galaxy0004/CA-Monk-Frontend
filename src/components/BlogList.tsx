import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getBlogs } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

const BlogList = () => {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
    });

    const params = useParams();
    const currentId = params.id;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = useMemo(() => {
        if (!blogs) return [];
        const cats = new Set<string>();
        blogs.forEach(blog => {
            blog.category?.forEach(c => cats.add(c));
        });
        return Array.from(cats);
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (!blogs) return [];
        return blogs.filter(blog => {
            const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? blog.category?.includes(selectedCategory) : true;
            return matchesSearch && matchesCategory;
        });
    }, [blogs, searchTerm, selectedCategory]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <Skeleton className="h-10 w-full rounded-md" />
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-destructive">Error loading blogs.</div>;
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 pb-2 space-y-3 bg-background/50 backdrop-blur-sm z-10">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search articles..."
                        className="pl-9 bg-background/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {categories.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-gradient">
                        <Badge
                            variant={selectedCategory === null ? "default" : "outline"}
                            className="cursor-pointer whitespace-nowrap hover:bg-primary/90"
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </Badge>
                        {categories.map(cat => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className="cursor-pointer whitespace-nowrap hover:bg-primary/90"
                                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4 p-4 pt-0 h-full overflow-y-auto">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        <p>No articles found.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
                            className="text-sm text-primary hover:underline mt-2"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    filteredBlogs.map((blog) => (
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <Card
                                className={cn(
                                    "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md group",
                                    currentId === String(blog.id) ? "border-primary bg-primary/5 dark:bg-primary/10" : ""
                                )}
                            >
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {blog.category?.map((cat) => (
                                            <span key={cat} className="text-[10px] font-bold tracking-wider text-primary/70 uppercase">
                                                {cat}
                                            </span>
                                        ))}
                                        <span className="ml-auto text-[10px] text-muted-foreground">
                                            {/* Handle potentially invalid dates gracefully */}
                                            {!isNaN(new Date(blog.date).getTime())
                                                ? new Date(blog.date).toLocaleDateString()
                                                : "Recent"}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                        {blog.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <CardDescription className="line-clamp-2">
                                        {blog.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogList;
