export function generateSlug(name: string) {
  return name
    .toLowerCase() // Convert the name to lowercase
    .trim() // Remove any leading/trailing whitespace
    .replace(/[^a-z0-9\s]/g, "") // Remove any non-alphanumeric characters except spaces
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/^-+|-+$/g, ""); // Remove any leading/trailing dashes
}
