import React from "react";
import { useParams, Link } from "react-router-dom";
import BlogList from "@/components/BlogList";
import BlogDetail from "@/components/BlogDetail";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const Home = () => {
    const { id } = useParams();

    return (
        <div className="flex h-screen flex-col bg-background text-foreground transition-colors duration-300">
            {/* Header */}
            <header className="flex h-16 items-center border-b px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl mr-auto">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                        CA
                    </div>
                    <span>Monk Blog</span>
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link to="/create">
                        <Button className="gap-2 shadow-sm hover:shadow-md transition-all">
                            <PenSquare className="w-4 h-4" />
                            <span className="hidden sm:inline">Write Article</span>
                            <span className="sm:hidden">Write</span>
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel: Blog List */}
                <aside
                    className={cn(
                        "w-full md:w-[350px] lg:w-[400px] border-r bg-muted/5 flex flex-col",
                        id ? "hidden md:flex" : "flex"
                    )}
                >
                    <div className="p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="font-semibold text-lg">Latest Articles</h2>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Updates</span>
                    </div>
                    <BlogList />
                </aside>

                {/* Right Panel: Detail or Empty */}
                <main
                    className={cn(
                        "flex-1 bg-background relative",
                        !id && "hidden md:block"
                    )}
                >
                    {id ? (
                        <BlogDetail />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 animate-in fade-in duration-700">
                            <div className="w-64 h-64 bg-muted/30 rounded-full flex items-center justify-center mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50" />
                                <svg className="w-24 h-24 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">Welcome to CA Monk Blog</h3>
                            <p className="max-w-md text-center mt-2 text-balance">
                                Discover the latest insights in finance, auditing, and career growth. Select an article from the list to start reading.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
