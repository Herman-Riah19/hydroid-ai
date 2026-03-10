import Image from "next/image";
import Link from "next/link";
import { getAllBlogs } from "@/actions/blog.action";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@repo/ui/components/ui/card";

export default async function PageBlog() {
  const blogs = getAllBlogs();

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto p-4">
      <section className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link href={`/${blog.fileName}`}>
            <Card>
              <CardHeader>
                <Image
                  src={blog.banner_url}
                  alt={blog.title}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

