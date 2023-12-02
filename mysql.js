const mysql = require('mysql');

function realizarConsulta(callback) {
    const conection = mysql.createConnection({
        host: 'bdhzvaarimvcqyygc6fo-mysql.services.clever-cloud.com',
        user: 'uzft6cy7b4gmyuyt',
        password: 'DzdsgV8t7LdjNcxD88A3',
        database: 'bdhzvaarimvcqyygc6fo',
        port: '3306'
    });

    conection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            throw err;
        }
        console.log('Database Connected');

        // Ejemplo de consulta SELECT
        const sqlQuery = 'SELECT * FROM usuario';

        conection.query(sqlQuery, (queryErr, results) => {
            if (queryErr) {
                console.error('Error in query:', queryErr);
                throw queryErr;
            }

            console.log('Query results:', results);

            // Cerrar la conexión después de realizar la consulta
            conection.end();

            // Llamar al callback con los resultados de la consulta
            callback(results);
        });
    });
}

module.exports = realizarConsulta;
