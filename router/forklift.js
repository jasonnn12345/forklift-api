const express = require('express');
const router = express.Router();
const { connection } = require('../db-con');

router.post('/create', (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO forklift SET ?', data, (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).json({ message: 'Gagal menambahkan forklift.' });
        }
        res.status(201).json({ message: 'Forklift berhasil ditambahkan.' });
    });
});

// Lihat semua forklift
router.get('/', (_, res) => {
    connection.query('SELECT * FROM forklift', (err, data) => {
        if (err) return res.status(500).json({ message: 'Gagal mengambil data forklift.' });
        res.json(data);
    });
});

// Lihat forklift berdasarkan ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM forklift WHERE id_forklift = ?', [id], (err, data) => {
        if (err) return res.status(500).json({ message: 'Kesalahan mengambil data.' });
        if (data.length === 0) return res.status(404).json({ message: 'Forklift tidak ditemukan.' });
        res.json(data[0]);
    });
});

// Update forklift
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const input = req.body;
    connection.query('UPDATE forklift SET ? WHERE id_forklift = ?', [input, id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengubah data forklift.' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Forklift tidak ditemukan.' });
        res.json({ message: 'Forklift berhasil diperbarui.' });
    });
});

// Hapus forklift
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM forklift WHERE id_forklift = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ pesan: 'Gagal menghapus forklift.' });
        if (result.affectedRows === 0) return res.status(404).json({ pesan: 'Forklift tidak ditemukan.' });
        res.json({ pesan: 'Forklift berhasil dihapus.' });
    });
});

module.exports = router;
