import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Category() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="breadcrumb flex items-center gap-x-1 text-sm text-gray-600">
          <span>خانه</span>
          <ChevronLeft size={20}/>
          <Link href="/category" className="text-rose-500">دسته بندی</Link>
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-1"></div>
            <div className="col-span-3">
                
            </div>
        </div>
      </div>
    </div>
  );
}
