// API service for chat bot functionality
// Based on the updated OpenAPI contract

export interface ChatRequest {
  message: string;
  conversation_id?: string | null;
  user_id?: string | null;
  user_name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  user_id: string;
  model_info: Record<string, any>;
}

export interface VerificationRequest {
  contact_info: string;
  contact_type: 'email' | 'phone';
  user_id: string;
  user_name?: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  expires_in?: number | null;
  error?: string | null;
}

export interface CodeVerificationRequest {
  user_id: string;
  code: string;
  contact_info: string;
}

export interface ModelSwitchRequest {
  model_name: string;
  conversation_id?: string | null;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Configuration - you may want to make this configurable via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ChatApiService {
  private async apiCall<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  private async multipartApiCall<T>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    return this.apiCall<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async uploadCV(file: File, conversationId: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('conversation_id', conversationId);
    
    return this.multipartApiCall<any>('/upload-cv', formData);
  }

  async sendVerificationCode(request: VerificationRequest): Promise<VerificationResponse> {
    return this.apiCall<VerificationResponse>('/verify', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async verifyCode(request: CodeVerificationRequest): Promise<any> {
    return this.apiCall<any>('/verify-code', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getAvailableModels(): Promise<any> {
    return this.apiCall<any>('/models');
  }

  async switchModel(request: ModelSwitchRequest): Promise<any> {
    return this.apiCall<any>('/switch-model', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getConversationInfo(conversationId: string): Promise<any> {
    return this.apiCall<any>(`/conversation/${conversationId}`);
  }

  async getConversationHistory(conversationId: string): Promise<any> {
    return this.apiCall<any>(`/conversation/${conversationId}/history`);
  }

  async getConversationMessages(conversationId: string): Promise<ConversationMessage[]> {
    return this.apiCall<ConversationMessage[]>(`/conversation/${conversationId}/messages`);
  }

  async listConversations(userId?: string): Promise<any> {
    const queryParam = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
    return this.apiCall<any>(`/conversations${queryParam}`);
  }

  async getUserConversations(userId: string): Promise<any> {
    return this.apiCall<any>(`/user/${userId}/conversations`);
  }

  async healthCheck(): Promise<any> {
    return this.apiCall<any>('/health');
  }
}

export const chatApiService = new ChatApiService();
