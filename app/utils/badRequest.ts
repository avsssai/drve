import { json } from "@remix-run/react";

export function badRequest<T>(data: T) {
  return json(data, { status: 400 });
}
