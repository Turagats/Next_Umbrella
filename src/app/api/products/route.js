import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    const products = await req.json();
    // console.log(fileContents);
    // Process the form data and store it as needed
    // For example, you can save the products to a database or perform other operations
    // console.log(products);

    const jsonDirectory = path.join(process.cwd(), "");
    const fileContents = await fs.readFile(
      jsonDirectory + "/file.json",
      "utf8"
    );
    const parsedContents = JSON.parse(fileContents);

    // Add the new object to the existing array

    parsedContents.unshift(products);
    // console.log(parsedContents[1000]);
    // Write the updated contents back to the file
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

// export async function GET(req) {
//   try {
//     // const response = await req.json();
//     // Process the form data and store it as needed
//     // For example, you can save the products to a database or perform other operations
//     // console.log(req);
//     const fileContent = fs.readFile("file.json");
//     console.log(fileContent);

//     return new Response("Ok", { status: 200 });
//   } catch (error) {
//     return new Response("Invalid Request", { status: 400 });
//   }
// }

// export async function GET(req, res) {
//   try {
//     // Read the file
//     const fileContent = await fs.readFile("file.json");
//     // const fileContent = await fs.readFile("Dataobjcets.js");

//     // Return the file content as the response
//     // const some = res.status(200).json({ content: "fileContent" });
//     console.log("some");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to read the file" });
//   }
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const fileContents = ;
//     console.log(fileContents);
//     setText(fileContents);
//   };
// }

export async function GET(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/file.json", "utf8");
  //Return the content of the data file in json format
  // res.setHeader("Content-Type", "application/json");
  // res.status(200).send({ content: fileContents });
  // return res.status(200).json(fileContents);
  return new Response(fileContents, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
