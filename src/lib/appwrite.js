import { Client, Databases } from "appwrite";

const client = new Client();
const DB_ID = "6786cafa002e1eea75a1";
const COLLECTION_ID = "6786cb17001910fa297e";

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("6786ca460003234061b8");

export const databases = new Databases(client);

export { client, DB_ID, COLLECTION_ID };
