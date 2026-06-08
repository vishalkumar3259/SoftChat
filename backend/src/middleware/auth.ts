import type { Request, Response, NextFunction } from "express";
import { clerkMiddleware, requireAuth, getAuth } from "@clerk/express";
import { User } from "../models/User";

export type AuthRequest = Request & { userId?: string };

// Apply clerkMiddleware globally (provides auth state everywhere)
export const applyClerk = (app: any) => {
  app.use(clerkMiddleware());
};

export const protectRoute = [
  // If you want redirect behavior (full-stack app):
  // requireAuth(),

  // If you want API-style behavior (backend routes):
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);

      if (!clerkId) {
        // For APIs, return 401 instead of redirect
        return res.status(401).json({ message: "Unauthorized - invalid token" });
      }

      const user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.userId = user._id.toString();
      next();
    } catch (error) {
      res.status(500);
      next(error as Error);;
    }
  },
];
