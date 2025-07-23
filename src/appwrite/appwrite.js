import { Client,Databases, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('687b7e4e001db8d233a8'); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

export {account, databases}
