import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`[backend] Servidor rodando na porta ${PORT}`);
  console.log(`[backend] API disponivel em http://localhost:${PORT}/api/v1`);
});

export default app;
