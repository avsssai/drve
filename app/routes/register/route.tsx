import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, Link, redirect, json } from "@remix-run/react";
import { badRequest } from "~/utils/badRequest";
import { registerNewUser } from "./registerNewUser";
import { getUserId, getUserSession } from "~/auth/session.server";

function validateEmail(email: string) {
  if (!email.includes("@") || email.length < 6) {
    return "Please enter a valid email address.";
  }
}

function validatePassword(password: string, confirmPassword: string) {
  if (password.length < 6) {
    return "Please enter a password greater than 5 characters.";
  } else if (password !== confirmPassword) {
    return "Password and Confirm Password dont match.";
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) {
    throw redirect("/");
  }
  return json({ userId });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirm-password"));
  let fields = { email, password };
  let fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password, confirmPassword),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ formError: null, fieldErrors, fields });
  }

  return await registerNewUser(email, password);
};

export default function Register() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="mt-16 p-4 flex-1 md:flex">
      <Form method="post" className="shadow-lg p-4 rounded-lg sm:max-w-[300px]">
        <h1 className="mb-4 font-bold">Register.</h1>
        <label className="text-xl font-bold" htmlFor="email">
          Email{" "}
          <input
            type="text"
            id="email"
            name="email"
            className="block p-2 w-full outline outline-2 focus:outline-offset-2 focus:outline-2 rounded-md"
          />
        </label>
        {actionData?.fieldErrors.email ? (
          <p className="text-xs text-red-600">{actionData.fieldErrors.email}</p>
        ) : null}

        <label className="text-xl font-bold my-4" htmlFor="password">
          Password{" "}
          <input
            type="password"
            id="password"
            name="password"
            className="block p-2 w-full outline outline-2 focus:outline-offset-2 focus:outline-2 rounded-md"
          />
        </label>
        {actionData?.fieldErrors.password ? (
          <p className="text-xs text-red-600">
            {actionData.fieldErrors.password}
          </p>
        ) : null}
        <label className="text-xl font-bold my-4" htmlFor="confirm-password">
          Confirm password{" "}
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="block p-2 w-full outline outline-2 focus:outline-offset-2 focus:outline-2 rounded-md"
          />
        </label>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-black w-full text-white text-sm font-bold px-2 py-3 mb-2 rounded-md focus:outline-none focus:ring focus:ring-black"
          >
            Register
          </button>
          <Link to="/register" className="text-sm underline hover:no-underline">
            Have an account? Login
          </Link>
        </div>
      </Form>
      <div className="flex-1 relative">
        <img
          className="absolute h-full w-full object-contain"
          src="/landing/drve-slide1.jpeg"
        />
      </div>
    </div>
  );
}
