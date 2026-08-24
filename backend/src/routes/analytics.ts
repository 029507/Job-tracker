import { Router, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get("/stats", async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.userId },
    });

    const stats = {
      total: applications.length,
      applied: applications.filter((a) => a.status === "APPLIED").length,
      phoneScreen: applications.filter((a) => a.status === "PHONE_SCREEN").length,
      interview: applications.filter((a) => a.status === "INTERVIEW").length,
      offer: applications.filter((a) => a.status === "OFFER").length,
      rejected: applications.filter((a) => a.status === "REJECTED").length,
      withdrawn: applications.filter((a) => a.status === "WITHDRAWN").length,
      responseRate:
        applications.length > 0
          ? Math.round(
              ((applications.length -
                applications.filter((a) => a.status === "APPLIED").length) /
                applications.length) *
                100
            )
          : 0,
      successRate:
        applications.length > 0
          ? Math.round(
              (applications.filter((a) => a.status === "OFFER").length /
                applications.length) *
                100
            )
          : 0,
    };

    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications by month for chart
router.get("/timeline/monthly", async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.userId },
      orderBy: { appliedDate: "asc" },
    });

    // Group by month
    const monthlyData: { [key: string]: number } = {};
    applications.forEach((app) => {
      const month = app.appliedDate.toISOString().slice(0, 7); // YYYY-MM
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const data = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    }));

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get status distribution
router.get("/distribution/status", async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.userId },
    });

    const distribution = {
      APPLIED: applications.filter((a) => a.status === "APPLIED").length,
      PHONE_SCREEN: applications.filter((a) => a.status === "PHONE_SCREEN")
        .length,
      INTERVIEW: applications.filter((a) => a.status === "INTERVIEW").length,
      OFFER: applications.filter((a) => a.status === "OFFER").length,
      REJECTED: applications.filter((a) => a.status === "REJECTED").length,
      WITHDRAWN: applications.filter((a) => a.status === "WITHDRAWN").length,
    };

    res.json(distribution);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
