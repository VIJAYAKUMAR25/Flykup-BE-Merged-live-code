// src/routes/blockedRegion.routes.js

import express from 'express';
import { createBlockedRegion, getBlockedRegions, deleteBlockedRegion, bulkCreateBlockedRegions } from '../controllers/blockedRegion.controller.js';

const router = express.Router();

// POST - Create a block
router.post('/create', createBlockedRegion);

// ✅ Bulk create
router.post('/bulk', bulkCreateBlockedRegions);

// GET - Fetch all blocks
router.get('/get', getBlockedRegions);

// DELETE - Remove a block
router.delete('/:id', deleteBlockedRegion);

export default router;
