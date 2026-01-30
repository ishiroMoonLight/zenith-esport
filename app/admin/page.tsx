import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { blogPosts } from "@/data/blogData";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400">Manage your blog posts and content.</p>
                </div>
                <Link
                    href="/admin/posts/create"
                    className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                </Link>
            </div>

            <div className="relative overflow-x-auto rounded-lg border border-slate-800 shadow-xl">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900 text-xs uppercase text-slate-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(blogPosts || []).map((post) => (
                            <tr key={post.id} className="border-b border-slate-800 bg-slate-950 hover:bg-slate-900/50">
                                <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-white">
                                    {post.title}
                                </th>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center rounded-md bg-violet-400/10 px-2 py-1 text-xs font-medium text-violet-400 ring-1 ring-inset ring-violet-400/20">
                                        {post.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {post.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/posts/edit/${post.id}`}
                                            className="rounded p-2 text-blue-500 hover:bg-blue-500/10"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Link>
                                        <button className="rounded p-2 text-red-500 hover:bg-red-500/10">
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!blogPosts || blogPosts.length === 0) && (
                            <tr className="border-b border-slate-800 bg-slate-950">
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                    No posts found. Start by creating one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
