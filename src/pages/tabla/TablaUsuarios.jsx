import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from "@mui/material";

const usuarios = [
  { nombre: "María", apellido: "Pérez", edad: 16 },
  { nombre: "Carlos", apellido: "Gómez", edad: 22 },
  { nombre: "Ana", apellido: "López", edad: 17 },
  { nombre: "Luis", apellido: "Martínez", edad: 28 },
  { nombre: "Elena", apellido: "Ramírez", edad: 20 },
];

const TablaUsuarios = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Tabla de Usuarios</Typography>
      <Typography paragraph>
        Este ejercicio obtiene datos simulados desde una API, representando usuarios con marcadores en el mapa. Además, se muestra una tabla con los datos de cada usuario.
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Edad</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.edad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablaUsuarios;
