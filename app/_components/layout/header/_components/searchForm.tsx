import { Search } from "lucide-react";
import Form from "next/form";

export default function SearchForm() {
  return (
    <Form
      action="/products"
      className="searchbar flex items-center bg-gray-100 text-gray-400 rounded-full overflow-hidden text-sm flex-grow"
    >
      <button type="submit" className="lg:p-4 p-3 cursor-pointer">
        <Search />
      </button>
      <input
        name="search"
        type="text"
        placeholder="جستجوی گل در شکوفا"
        className="outline-none w-full lg:py-4 py-3"
      />
    </Form>
  );
}
