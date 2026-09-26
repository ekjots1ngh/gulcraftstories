import { redirect } from "next/navigation";

/** There is no basket any more: each piece is bought from its own page. */
export default function CartPage() {
  redirect("/shop");
}
