import { Client } from "@elastic/elasticsearch";

// 🔗 Configuração do client Elasticsearch
export const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    // username: 'elastic',
    // password: 'admin'
    apiKey: process.env.API_KEY ?? ""
  }
});