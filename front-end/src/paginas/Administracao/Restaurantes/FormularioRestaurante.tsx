import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormularioRestaurante = () => {

    const parametros = useParams();

    useEffect(() => {
        if(parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso')
                })
        }
        else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso')
                })
        }
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} label="Nome do Restaurante" variant="standard" />
            <Button variant="outlined" type='submit'>Salvar</Button>
        </form>
    );
}

export default FormularioRestaurante;
