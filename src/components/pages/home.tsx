"use client"
import { useUser } from "@/src/hooks/use-user"
import { useStore } from "@/src/store/counter-store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Home = () => {
    const router = useRouter();
    const { user, loading } = useUser()
    const { count, increment, decrement, reset } = useStore();
    const [text, setText] = useState("");

    const prepend = (char: string) => setText(prev => char + prev);
    const append = (char: string) => setText(prev => prev + char);
    const clear = () => setText("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-2xl font-medium mb-6 text-foreground">User: {user.email}</h1>
            <section className="space-y-8">
                <div>
                    <h2 className="text-lg font-medium mb-4 text-foreground">Text Demo</h2>
                    <div className="p-6 bg-primary text-primary-foreground shadow-sm rounded-lg">
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={() => prepend("A")}
                                className="px-4 py-2 bg-background text-foreground rounded-md hover:bg-muted transition-colors"
                            >
                                Prepend A
                            </button>
                            <span className="text-2xl">{text}</span>
                            <button
                                onClick={() => append("Z")}
                                className="px-4 py-2 bg-background text-foreground rounded-md hover:bg-muted transition-colors"
                            >
                                Append Z
                            </button>
                            <button
                                onClick={clear}
                                className="px-4 py-2 bg-background text-foreground rounded-md hover:bg-muted transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-4 text-foreground">Colors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-primary text-primary-foreground rounded-lg">Primary Color</div>
                        <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">Secondary Color</div>
                        <div className="p-4 bg-accent text-accent-foreground rounded-lg">Accent Color</div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-4 text-foreground">Typography</h2>
                    <div className="space-y-2">
                        <p className="text-base text-foreground">Primary Font: Inter</p>
                        <p className="text-2xl font-semibold text-foreground">Heading Text Size</p>
                        <p className="text-sm text-muted-foreground">Subheading Text Size</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-4 text-foreground">Shadows</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-card rounded-lg shadow-sm">Primary Shadow</div>
                        <div className="p-4 bg-card rounded-lg shadow-md">Secondary Shadow</div>
                        <div className="p-4 bg-card rounded-lg shadow-lg">Accent Shadow</div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-4 text-foreground">Combined Elements</h2>
                    <div className="p-6 bg-primary text-primary-foreground shadow-sm rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Primary Section</h3>
                        <p>Using primary colors and shadows</p>
                    </div>

                    <div className="p-6 bg-secondary text-secondary-foreground shadow-sm rounded-lg mt-4">
                        <h3 className="text-lg font-semibold mb-2">Secondary Section</h3>
                        <p>Using secondary colors and shadows</p>
                    </div>
                </div>
            </section>
        </div>
    )
}