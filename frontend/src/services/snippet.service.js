import api from './api';

export const snippetService={
    getAllSnippets:async()=>{
        const response=await api.get('/snippets/my/snippets');
        return {snippets:response.data};
    },
    getSnippet:async(id)=>{
        const response = await api.get(`/snippets/${id}`);
        return response.data;
    },
    createSnippet:async(snippetData)=>{
        const response=await api.post(`/snippets`,snippetData);
        return response.data;
    },
    updateSnippet:async(id,snippetData)=>{
        const response=await api.put(`/snippets/${id}`, snippetData);
        return response.data;
    },
    deleteSnippet:async(id)=>{
        const response=await api.delete(`/snippets/${id}`);
        return response.data;
    },
    toggleLike:async(id)=>{
        const response=await api.post(`/snippets/${id}/like`);
        return response.data;
    },
   getPublicSnippets: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters);
        const response = await api.get(`/snippets?${queryParams}`); 
        return response.data;
    },
     getLikedSnippets: async () => {
        const response = await api.get('/snippets/my/liked');
        return response.data;
    },
     generateShareLink: async (snippetId) => {
        const response = await api.post(`/snippets/${snippetId}/share`);
        return response.data;
    },
    getSharedSnippets:async()=>{
        const response=await api.get(`/share/${shareToken}`);
        return response.data;
    },
    revokeSharing: async (snippetId) => {
        const response = await api.delete(`/snippets/${snippetId}/share`);
        return response.data;
    }
}