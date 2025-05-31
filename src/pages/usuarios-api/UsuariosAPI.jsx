import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Paper, Typography
} from "@mui/material";

const UsuariosAPI = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al obtener los usuarios:", err));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Usuarios desde API</Typography>
      <Typography paragraph>
        En este ejercicio se simula la obtención de datos desde una API, mostrando los usuarios como marcadores en el mapa.
        Cada marcador representa a un usuario con coordenadas específicas y nombre.
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Ciudad</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.name}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.address.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsuariosAPI;
