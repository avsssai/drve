import { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(await request.formData());
  return null;
};

export default function Orders() {
  return (
    <div>
      <h1 className="mb-4">Add a new product.</h1>
      <Form method="post">
        <label htmlFor="name">
          Name
          <input
            type="text"
            className="block w-full p-2 font-normal"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="category">
          Category
          <input
            type="text"
            className="block w-full p-2 font-normal"
            name="category"
            id="category"
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
