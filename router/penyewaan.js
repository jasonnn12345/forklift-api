const express = require('express');
const router = express.Router();
const { connection } = require('../db-con');

// Tambah penyewaan
router.post('/create', (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO penyewaan SET ?', data, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menambahkan penyewaan.' });
        res.status(201).json({ message: 'Data penyewaan berhasil disimpan.' });
    });
});

// // Ambil semua penyewaan
// router.get('/', (_, res) => {
//     connection.query('SELECT * FROM penyewaan', (err, rows) => {
//         if (err) return res.status(500).json({ message: 'Gagal mengambil data penyewaan.' });
//         res.json(rows);
//     });
// });

// Ambil semua penyewaan
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            p.id_penyewaan,
            p.id_forklift,
            py.id_penyewa,
            py.nama_penyewa,
            f.merk_forklift,
            f.kapasitas_forklift,
            p.tanggal_sewa,
            p.lama_sewa,
            p.total_biaya,
            f.harga_sewa,
            py.alamat,
            py.no_telp
        FROM penyewaan p
        JOIN penyewa py ON p.id_penyewa = py.id_penyewa
        JOIN forklift f ON p.id_forklift = f.id_forklift
    `;
    connection.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
        }
        res.json(rows);
    });
});


// Detail penyewaan berdasarkan id_penyewaan
router.get('/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM penyewaan WHERE id_penyewaan = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data.' });
        if (rows.length === 0) return res.status(404).json({ message: 'Data penyewaan tidak ditemukan.' });
        res.json(rows[0]);
    });
});

// Update penyewaan berdasarkan id_penyewaan
router.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    connection.query('UPDATE penyewaan SET ? WHERE id_penyewaan = ?', [updateData, id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal memperbarui penyewaan.' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data penyewaan tidak ditemukan.' });
        res.json({ message: 'Data penyewaan berhasil diperbarui.' });
    });
});

// Hapus penyewaan berdasarkan id_penyewaan
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM penyewaan WHERE id_penyewaan = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus data penyewaan.' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Data penyewaan tidak ditemukan.' });
        res.json({ message: 'Data penyewaan berhasil dihapus.' });
    });
});

module.exports = router;
