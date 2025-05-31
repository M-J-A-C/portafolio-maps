import React, { useState, useEffect } from "react";
import { Button, Typography, Stack } from "@mui/material";

const Contador = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 10) {
      alert("El valor no puede ser mayor que 10.");
      setCount(10);
    }
  }, [count]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Contador con useState y useEffect</Typography>
      <Typography paragraph>
        Este ejercicio implementa un contador simple utilizando el hook <code>useState</code> de React. Los botones permiten incrementar, 
        disminuir o reiniciar el valor del contador.
      </Typography>
      <Typography variant="h5">Valor actual: {count}</Typography>
      <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => setCount(count + 1)}>Incrementar</Button>
        <Button variant="outlined" onClick={() => setCount(count - 1)}>Disminuir</Button>
        <Button variant="text" onClick={() => setCount(0)}>Reiniciar</Button>
      </Stack>
    </div>
  );
};

export default Contador;
