
import { getCategories } from "@/app/lib/actions";
import Menu from "./menu";

export default async function MainMenu() {
  const categories = await getCategories();

  return <Menu items={categories}/>;
}
