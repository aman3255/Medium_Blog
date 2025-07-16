import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks/index';

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {blogs.map((blog) => (
                        <BlogCard
                            id={blog.id} // Assuming blog has an id field
                            authorName={blog.author.name} // Assuming a static author name for now
                            title={blog.title} // Assuming a static title for now
                            content={blog.content} // Assuming a static content for now
                            publishedDate={"2023-10-01"} // Assuming a static published date for now
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
