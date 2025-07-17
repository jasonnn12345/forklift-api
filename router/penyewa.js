const express = require('express');
const router = express.Router();
const { connection } = require('../db-con');

// Tambah penyewa
router.post('/create', (req, res) => {
    const data = req.body;
    connection.getConnection((err, db) => {
        if (err) return res.status(500).json({ error: 'Database connection failed' });

        db.query('INSERT INTO penyewa SET ?', data, (err, result) => {
            db.release();
            if (err) return res.status(500).json({ error: 'Insert failed' });

            res.status(201).json({ message: `Penyewa ${data.nama_penyewa} added` });
        });
    });
});

// Daftar semua penyewa
router.get('/list', (req, res) => {
    connection.getConnection((err, db) => {
        if (err) return res.status(500).json({ error: 'Connection error' });

        db.query('SELECT * FROM penyewa', (err, results) => {
            db.release();
            if (err) return res.status(500).json({ error: 'Query error' });

            res.json(results);
        });
    });
});

// Detail penyewa
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    connection.getConnection((err, db) => {
        if (err) return res.status(500).json({ error: 'Connection error' });

        db.query('SELECT * FROM penyewa WHERE id_penyewa = ?', [id], (err, results) => {
            db.release();
            if (err) return res.status(500).json({ error: 'Query error' });
            if (results.length === 0) return res.status(404).json({ message: 'Not found' });

            res.json(results[0]);
        });
    });
});

// Edit penyewa
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    connection.getConnection((err, db) => {
        if (err) return res.status(500).json({ error: 'Connection failed' });

        db.query('UPDATE penyewa SET ? WHERE id_penyewa = ?', [data, id], (err, result) => {
            db.release();
            if (err) return res.status(500).json({ error: 'Update failed' });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Not found' });

            res.json({ message: 'Updated successfully' });
        });
    });
});

// Hapus penyewa
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.getConnection((err, db) => {
        if (err) return res.status(500).json({ error: 'Connection error' });

        db.query('DELETE FROM penyewa WHERE id_penyewa = ?', [id], (err, result) => {
            db.release();
            if (err) return res.status(500).json({ error: 'Delete failed' });
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Not found' });

            res.json({ message: 'Deleted successfully' });
        });
    });
});

module.exports = router;
