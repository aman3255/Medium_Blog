import { Link } from "react-router-dom";


interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-400 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}  {/* Display first 100 characters of content */}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`} {/* Estimate read time */}
            </div>
        </div>

        </Link>
    )
}

function Circle() {
    return (
        <div className="w-1 h-1 rounded-full bg-slate-500">

        </div>
    )
}

export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    // Split name by spaces and extract initials
    const getInitials = (fullName: string) => {
        const parts = fullName.trim().split(' ');
        if (parts.length === 1) {
            return parts[0][0].toUpperCase();
        }
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    const initials = getInitials(name);

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6": "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {initials}
            </span>
        </div>
    );
}
