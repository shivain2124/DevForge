import api from './api';

export const commentService = {
    // Get comments for a specific snippet
    getCommentsForSnippet: async (snippetId) => {
        const response = await api.get(`/comments/snippets/${snippetId}`);
        return response.data;
    },
    
    // Add a new comment to a snippet
    addCommentToSnippet: async (snippetId, commentData) => {
        const response = await api.post(`/comments/snippets/${snippetId}`, commentData);
        return response.data;
    },
    
    // Update a comment
    updateComment: async (commentId, commentData) => {
        const response = await api.put(`/comments/${commentId}`, commentData);
        return response.data;
    },
    
    // Delete a comment
    deleteComment: async (commentId) => {
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    }
};
