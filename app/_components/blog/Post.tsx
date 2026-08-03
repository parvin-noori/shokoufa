import { Clock, Heart } from "lucide-react";
import Image from "next/image";
import { PostType } from "./post.types";
import Link from "next/link";

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  return (
    <Link href="/" className="flex flex-col h-full text-gray-800 gap-y-4 shadow-[0_0_24px_rgba(0,0,0,0.05)] border border-gray-200 p-3 rounded-2xl hover:shadow-[0_0_24px_rgba(0,0,0,0.18)] transition-all duration-200">
      <Image
        src={post.image_url}
        alt={post.title}
        className="w-full rounded-lg"
        width={400}
        height={300}
      />
      <span className="font-semibold text-lg text-gray-800 line-clamp-2">{post.title}</span>
      <div className="flex items-center gap-x-5 text-gray-400 text-sm mt-auto">
        <span className="flex items-center gap-x-1">
          <Clock size={16}/>
          16
        </span>
        <span className="flex items-center gap-x-1">
          <Heart size={16}/>
          999
        </span>
      </div>
    </Link>
  );
}
