import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Clientecito = () => {
    const [docentes, setDocentes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
                const data = await response.json();
                setDocentes(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    // Datos para la gráfica de barras (IDs de Docentes)
    const idsData = {
        labels: docentes.map((docente) => `ID ${docente.id}`),
        datasets: [
            {
                label: 'IDs de Docentes',
                data: docentes.map((docente) => docente.id),
                backgroundColor: '#36a2eb', // Color uniforme para las barras
            },
        ],
    };

    // Datos para la gráfica de Género (M y F)
    const generoData = {
        labels: ['M', 'F'],
        datasets: [
            {
                label: 'Número de Docentes por Género',
                data: [
                    docentes.filter((docente) => docente.sexo === 'M').length,
                    docentes.filter((docente) => docente.sexo === 'F').length,
                ],
                backgroundColor: ['#36a2eb', '#ff6384'],
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Gráfica de Barras de IDs de Clientes</h1>
            <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
                <Bar data={idsData} options={{ responsive: true }} />
            </div>

            <h1 style={{ marginTop: '40px' }}>Gráfica por Género</h1>
            <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                <Pie data={generoData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Clientecito;

