export interface ApiResponse<T> { success: boolean; message: string; data: T | null; errors?: unknown; }
export const successResponse = <T>(message: string, data: T): ApiResponse<T> => ({ success: true, message, data });
export const errorResponse = (message: string, errors?: unknown): ApiResponse<never> => ({
  success: false, message, data: null, ...(errors === undefined ? {} : { errors }),
});
