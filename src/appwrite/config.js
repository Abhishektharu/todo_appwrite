import { Client, Account } from "appwrite";
import {conf }from '../conf/conf'
const client = new Client()
    .setEndpoint(conf.endpoint) // Your API Endpoint
    .setProject(conf.projectId); // Your project ID

const account = new Account(client);

export default account