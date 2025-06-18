/* General framework from ChatGPT for middlware:
const app = express();
app.use(errorHandlerMiddleware);
app.use(express.json());
app.use(authenticationMiddleware);
app.use(rateLimitingMiddleware);
const prisma = new PrismaClient();
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.use(loggingMiddleware);

also, define routes more specific to less specific
*/



const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const boardRoutes = require('./routes/boardRoutes')
const cardRoutes = require('./routes/cardRoutes')

app.use(express.json());
app.use('/boards', boardRoutes);
app.use('/cards', cardRoutes);

app.get('/', (req, res)=>{
    res.send("welcome to kudos board");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})