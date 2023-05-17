import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

export default async function handler(req, res) {
    if (req.method === "POST") {
      return await storeEventData(req, res);
    } else {
      return res
        .status(405)
        .json({ message: "Method not allowed", success: false });
    }
}

async function storeEventData(req, res) {
    const body = req.body;
    try {
      const files = await makeFileObjects(body);
      const cid = await storeFiles(files);
      return res.status(200).json({ success: true, cid: cid });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error creating event", success: false });
    }
}

//purpose of this function is to create a json file that includes metadata passed from the req.body object
async function makeFileObjects(body) {
    const buffer = Buffer.from(JSON.stringify(body));
  
    const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
    const files = await getFilesFromPath(imageDirectory);
  
    files.push(new File([buffer], "data.json"));
    return files;
}

function makeStorageClient() {
    return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

// function which will store that json file to Web3.storage.
async function storeFiles(files) {
    const client = makeStorageClient();
    const cid = await client.put(files);
    return cid;
}