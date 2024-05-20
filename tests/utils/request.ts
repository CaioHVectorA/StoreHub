// Inspired by axios.create

interface FetchResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
    config: FetchRequestConfig;
  }
  
  interface FetchRequestConfig {
    headers?: Record<string, string>;
    isFile?: boolean;
  }
  class FetchInstance {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    private async request<T>(url: string, method: string, data?: any, options?: FetchRequestConfig): Promise<FetchResponse<T>> {
      const response = await fetch(this.baseUrl + url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers
        },
        body: data ? JSON.stringify(data) : undefined
      });
      let responseData;
      if (options?.isFile) {
        responseData = await response.blob();
      } else {
        responseData = await response.json();
      }
      return {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: options || {}
      };
    }
  
    get<T>(url: string, options?: FetchRequestConfig): Promise<FetchResponse<T>> {
      return this.request<T>(url, "GET", undefined, options);
    }
  
    post<T>(url: string, data?: any, options?: FetchRequestConfig): Promise<FetchResponse<T>> {
      return this.request<T>(url, "POST", data, options);
    }
  
    put<T>(url: string, data?: any, options?: FetchRequestConfig): Promise<FetchResponse<T>> {
      return this.request<T>(url, "PUT", data, options);
    }
  
    delete<T>(url: string, options?: FetchRequestConfig): Promise<FetchResponse<T>> {
      return this.request<T>(url, "DELETE", undefined, options);
    }
  }
  
export const request = new FetchInstance("http://localhost:3000");
