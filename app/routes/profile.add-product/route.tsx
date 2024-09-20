import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getUserId, requireUserSession } from "~/auth/session.server";
import { createNewProduct } from "./addProductActions";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const category = String(formData.get("category"));
  const subCategory = String(formData.get("sub-category"));
  const price = String(formData.get("price"));
  const imageUrl = String(formData.get("imageUrl"));
  const userId = await requireUserSession(request);
  console.log(name);
  const product = await createNewProduct(
    name,
    category,
    subCategory,
    price,
    imageUrl,
    userId
  );
  return json({ product });
};

export default function Orders() {
  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Add a new product.</h1>
      <Form method="post">
        <label htmlFor="name">
          <p className="text-sm font-bold">Name</p>
          <input
            type="text"
            className="block w-full p-2 mb-4 font-normal outline outline-1"
            name="name"
            required
            id="name"
          />
        </label>
        <label htmlFor="category">
          <span className="mb-4 text-sm font-bold">Category</span>
          <select
            name="category"
            id="category"
            required
            className="text-sm outline outline-1 mb-4  focus:outline-offset-2 p-2 block"
          >
            <option value="">Please select a category</option>
            <option value="shoes">Shoes</option>
            <option value="hoodies">Hoodies</option>
            <option value="streetwear">Streetwear</option>
          </select>
        </label>
        <label htmlFor="sub-category">
          <span className="mb-4 text-sm font-bold">Sub Category</span>
          <select
            name="sub-category"
            id="sub-category"
            required
            className="text-sm outline outline-1 mb-4  focus:outline-offset-2 p-2 block"
          >
            <option value="">Please select a sub category</option>
            <optgroup label="Shoes">
              <option value="Sneakers">Sneakers</option>
              <option value="leather-shoes">Leather shoes</option>
              <option value="kickbacks">Kickbacks</option>
            </optgroup>
            <optgroup label="Hoodies">
              <option value="winter">Winter</option>
              <option value="oversized">Oversized</option>
              <option value="wool">Wool</option>
            </optgroup>
            <optgroup label="Streetwear">
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="polos">Polos</option>
            </optgroup>
          </select>
        </label>

        <label htmlFor="price">
          <span className="mb-4 text-sm font-bold">Price</span>

          <div className="flex gap-2 items-center relative">
            <p className="text-md absolute top-2 left-3">₹</p>
            <input
              type="text"
              name="price"
              id="price"
              required
              className="block w-full py-2 px-6 mb-4 font-normal outline outline-1"
            />
          </div>
        </label>
        <label htmlFor="imageUrl">
          <span className="mb-4 text-sm font-bold">Image URL</span>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            required
            className="block w-full p-2 mb-4 font-normal outline outline-1"
          />
        </label>
        <div>
          <button
            type="submit"
            className="bg-black w-full text-white text-sm font-bold px-2 py-3 my-2 rounded-md focus:outline-none focus:ring focus:ring-black"
          >
            Add Item
          </button>
        </div>
      </Form>
    </div>
  );
}
