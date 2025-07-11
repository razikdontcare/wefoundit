import { Response } from "express";
import { ApiResponse } from "../types/ApiType.js";
// Helper functions for standardized responses
const createSuccessResponse = <T>(
  message: string,
  data: T,
  statusCode: number = 200
) => {
  return {
    response: {
      success: true,
      message,
      data,
    } as ApiResponse<T>,
    statusCode,
  };
};

const createErrorResponse = (message: string, statusCode: number = 400) => {
  return {
    response: {
      success: false,
      message,
      data: null,
    } as ApiResponse<null>,
    statusCode,
  };
};

const sendResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = 200
) => {
  const { response, statusCode: code } = createSuccessResponse(
    message,
    data,
    statusCode
  );
  res.status(code).json(response);
};

const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400
) => {
  const { response, statusCode: code } = createErrorResponse(
    message,
    statusCode
  );
  res.status(code).json(response);
};

export { sendErrorResponse, sendResponse };
