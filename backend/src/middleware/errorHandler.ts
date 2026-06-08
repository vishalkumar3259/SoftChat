import type { Request, Response, NextFunction } from "express";

const sanitizeErrorMessage = (message: string) => {
  return message
    .replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, "[REDACTED_EMAIL]")
    .replace(/(\b(?:access|refresh)?token\b|\bid\b|\buuid\b|\bpassword\b)\s*[:=]?\s*[A-Za-z0-9\-_.]+/gi, "$1:[REDACTED]");
};

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   console.log("Error:", err.message);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";
  const safeMessage = isProduction ? sanitizeErrorMessage(err.message || "Internal Server Error") : err.message || "Internal Server Error";

   if (!isProduction) {
    console.log("Error:", err.message);
   }

  console.error({
    error: err.name,
    statusCode,
    message: safeMessage,
    ...(isProduction ? {} : { stack: err.stack }),
  });

  res.status(statusCode).json({
    message: safeMessage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// if status code is 200 and we still hit the error handler that means it's an internal error
// so we set the status code as 500