import express from 'express';
import createAdmin from './create-admin';
import deleteAdmin from './delete-admin';
import editAdmin from './edit-admin';
import getAdmin from './get-admin';
import listAdmin from './list-admin';

const router = express.Router();

// Retrieve specific admin information
router.get('/admin/:Id', getAdmin);
// Retrieve admin list
router.get('/admin', listAdmin);
// Create one admin
router.post('/admin', createAdmin);
// Edit specific admin information
router.put('/admin/:Id', editAdmin);
// Delete specifc admin
router.delete('/admin/:Id', deleteAdmin);

export { router as adminRouter };
