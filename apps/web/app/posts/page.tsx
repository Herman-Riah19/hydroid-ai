import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { PostServices } from "@/services/postServices";
import Link from "next/link";

export default async function Home() {
  const posts = await PostServices.getAllPosts();

  return (
    <div className="p-8 space-y-4">

      <div className="grid grid-cols-3 gap-4">
        {posts &&
          posts.map((post: any) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-bold text-2xl">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.content}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>

      <Badge>salutation</Badge>
    </div>
  );
}
