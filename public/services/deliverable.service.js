import axios from 'axios';
import {environment} from "@/environment/environment.js";

const token = localStorage.getItem('token');

const http = axios.create({
    baseURL: environment.baseUrl,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export class DeliverableService{

    async getAllDeliverables(projectId) {
        const response = await http.get(`/Projects/${projectId}/Deliverables`);
        return response.data;
    }

    async getDeliverableById(projectId, deliverableId) {
        const response = await http.get(`/Projects/${projectId}/Deliverables/${deliverableId}`);
        return response.data;
    }

    async createDeliverable(projectId, deliverable) {
        const response = await http.post(`/Projects/${projectId}/Deliverables`, deliverable);
        return response.data;
    }

    async updateDeliverable(projectId, deliverableId, deliverable) {
        const response = await http.put(`/Projects/${projectId}/Deliverables/${deliverableId}`, deliverable);
        return response.data;
    }

    async deleteDeliverable(projectId, orderNumber) {
        const response = await http.delete(`/Projects/${projectId}/Deliverables/${orderNumber}`);
        return response.data;
    }

    async uploadDeliverableFile(projectId, deliverableId, uploadFile) {
        const response = await http.put(`/Projects/${projectId}/Deliverables/${deliverableId}/Upload`, uploadFile);
        return response.data;
    }

    async approveDeliverable(projectId, deliverableId) {
        const response = await http.put(`/Projects/${projectId}/Deliverables/${deliverableId}/Approve`);
        return response.data;
    }

    async rejectDeliverable(projectId, deliverableId) {
        const response = await http.put(`/Projects/${projectId}/Deliverables/${deliverableId}/Reject`);
        return response.data;
    }

    async reviewDeliverable(projectId, deliverableId) {
        const response = await http.get(`/Projects/${projectId}/Deliverables/${deliverableId}/Review`);
        return response.data;
    }

}
