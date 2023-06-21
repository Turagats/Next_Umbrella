import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    const products = await req.json();
    const jsonDirectory = path.join(process.cwd(), "");
    const fileContents = await fs.readFile(
      jsonDirectory + "/file.json",
      "utf8"
    );
    const parsedContents = JSON.parse(fileContents);

    parsedContents.unshift(products);
    await fs.writeFile(
      jsonDirectory + "/file.json",
      JSON.stringify(parsedContents),
      "utf8"
    );

    return new Response("Ok", { status: 200 });
  } catch (error) {
    return new Response("Invalid Request", { status: 400 });
  }
}

export async function GET(req, res) {
  const jsonDirectory = path.join(process.cwd(), "");
  const fileContents = await fs.readFile(jsonDirectory + "/file.json", "utf8");

  return new Response(fileContents, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
