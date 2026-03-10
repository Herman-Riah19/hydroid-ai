import { PostServices } from "@/services/postServices";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@repo/ui/components/ui/card";
import * as React from "react";

export interface IPagePostByIdProps {
  params: { id: string };
}

export default async function PagePostById(props: IPagePostByIdProps) {
  const { id } = props.params;

  const post = await PostServices.getPostById(id);

  return (
    <div>
      <Card key={post.id} className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{post.content}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
