import { redirect } from "next/navigation";

/** The wishlist has been retired; old links and bookmarks go to the shop. */
export default function WishlistPage() {
  redirect("/shop");
}
