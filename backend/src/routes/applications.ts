import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// Get all applications for user
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { status, company, search } = req.query;

    const where: any = { userId: req.userId };

    if (status) {
      where.status = status;
    }

    if (company) {
      where.company = { contains: company as string, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { company: { contains: search as string, mode: "insensitive" } },
        { position: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: { appliedDate: "desc" },
    });

    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get single application
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
    });

    if (!application || application.userId !== req.userId) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.json(application);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create application
router.post(
  "/",
  [
    body("company").notEmpty().trim(),
    body("position").notEmpty().trim(),
    body("status").isIn([
      "APPLIED",
      "PHONE_SCREEN",
      "INTERVIEW",
      "OFFER",
      "REJECTED",
      "WITHDRAWN",
    ]),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company, position, jobUrl, description, status, notes } =
        req.body;

      const application = await prisma.application.create({
        data: {
          userId: req.userId!,
          company,
          position,
          jobUrl,
          description,
          status,
          notes,
        },
      });

      res.status(201).json(application);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update application
router.put(
  "/:id",
  [
    body("status")
      .optional()
      .isIn([
        "APPLIED",
        "PHONE_SCREEN",
        "INTERVIEW",
        "OFFER",
        "REJECTED",
        "WITHDRAWN",
      ]),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const application = await prisma.application.findUnique({
        where: { id: req.params.id },
      });

      if (!application || application.userId !== req.userId) {
        return res.status(404).json({ error: "Application not found" });
      }

      const updated = await prisma.application.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete application
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
    });

    if (!application || application.userId !== req.userId) {
      return res.status(404).json({ error: "Application not found" });
    }

    await prisma.application.delete({ where: { id: req.params.id } });

    res.json({ message: "Application deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
