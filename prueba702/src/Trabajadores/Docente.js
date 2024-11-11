import React, { useEffect, useState } from 'react';
import '../App.css';

const ListaDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                if (!response.ok) {
                    throw new Error('Error en la carga de datos');
                }
                const data = await response.json();
                setDocentes(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 20000); // Actualizar cada 30 segundos

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    return (
        <div className="table-container">
            <h1 className="table-title">Registro Clientes</h1>
            {error && <div className="error-message">Error: {error}</div>}
            <div className="tables-row">
                {docentes.map((docente) => (
                    <div key={docente.id} className="individual-table">
                        <table className="docente-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Sexo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{docente.id}</td>
                                    <td>{docente.nombre}</td>
                                    <td>{docente.telefono}</td>
                                    <td>{docente.sexo}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaDocentes;
