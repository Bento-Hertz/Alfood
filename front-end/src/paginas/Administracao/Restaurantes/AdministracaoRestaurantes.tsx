import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data));
    }, []);

    const excluir = (restauranteExcluido: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id);
                setRestaurantes([...listaRestaurante]);
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => 
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => excluir(restaurante)} variant="outlined" color="error">
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>              
                    )}
                </TableBody>
            </Table>

        </TableContainer>
    );
}

export default AdministracaoRestaurantes;