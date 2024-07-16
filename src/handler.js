const dbPool = require("../config/database");

const getAllusersHandler = async (request, h) => {
  try {
    const [rows] = await dbPool.execute("SELECT * FROM mahasiswa");
    return h
      .response({
        status: "success",
        data: rows,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: error.message,
      })
      .code(500);
  }
};

const updateUserHandler = async (request, h) => {
    const { id } = request.params;
    const updates = request.payload;

    // Buat query dasar untuk memperbarui pengguna
    let query = 'UPDATE mahasiswa SET ';
    let queryParams = [];
    let fields = [];

    // Loop melalui entri dalam payload dan tambahkan ke query
    for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = ?`);
        queryParams.push(value);
    }

    // Tambahkan kondisi WHERE untuk memilih pengguna berdasarkan ID
    query += fields.join(', ') + ' WHERE id = ?';
    queryParams.push(id);

    try {
        // Eksekusi query menggunakan dbPool
        const [result] = await dbPool.query(query, queryParams);

        // Cek apakah ada baris yang terpengaruh (diperbarui)
        if (result.affectedRows === 0) {
            return h.response({ 
                message: 'User not found' 
            }).code(404);
        }

        // Berikan respon sukses jika pembaruan berhasil
        return h.response({ 
            message: 'User updated successfully' 
        }).code(200);
    } catch (error) {
        // Tangani error dan berikan respon error
        console.error(error);
        return h.response({ 
            message: 'Failed to update user' 
        }).code(500);
    }
};


const addUserHandler = async (request, h) => {
    const { name, email, gender } = request.payload;

    try {
        const [result] = await dbPool.query(
            'INSERT INTO mahasiswa (name, email, gender) VALUES (?, ?, ?)',
            [name, email, gender]
        );

        return h.response({ 
            message: 'User added successfully',
            userId: result.insertId,
        }).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ 
            message: 'Failed to add user' 
        }).code(500);
    }
};

const deleteUserHandler = async (request, h) => {
    const { id } = request.params;

    try {
        const [result] = await dbPool.query('DELETE FROM mahasiswa WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return h.response({ 
                message: 'User not found' 
            }).code(404);
        }

        return h.response({ 
            message: 'User deleted successfully' 
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({
            message: 'Failed to delete user' 
        }).code(500);
    }
};


module.exports = {
  getAllusersHandler,
  updateUserHandler,
  addUserHandler,
  deleteUserHandler,
};
