import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class amocrmSerivce {
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://elevonseven.amocrm.ru/',
    });
  }

  async getLead(bearerToken: string, query: string): Promise<string> {
    const response = await this.axios.get('api/v4/leads', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: { query },
    });

    const responseContact = await this.axios.get('api/v4/contacts', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: { query },
    });

    const responsePipelines = await this.axios.get('api/v4/leads/pipelines', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: { query },
    });

    const responseUsers = await this.axios.get('/api/v4/users', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: { query },
    });

    const leads = response.data._embedded.leads;
    const contacts = responseContact.data._embedded.contacts;
    const pipelines = responsePipelines.data._embedded.pipelines;
    const users = responseUsers.data._embedded.users;

    let pipelineIndex = 0;
    let contactIndex = 0;
    let liableIndex = 0;
    
    const newLeads = leads.map((lead) => ({
      id: lead.id,
      price: lead.price,
      date: new Date(lead.created_at * 1000).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      liable: users[liableIndex++ % users.length],
      contact: contacts[contactIndex++ % contacts.length],
      pipeline: pipelines[pipelineIndex++ % pipelines.length],
    }));

    return newLeads;
  }

  async getContact(bearerToken: string, query: string): Promise<string> {
    const response = await this.axios.get('api/v4/contacts', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: { query },
    });

    return response.data;
  }
}
