const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const { faker } = require('@faker-js/faker');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {}).then(() => console.log("connected to db"))
.catch((e) => console.log(e));

// Definición de modelos
const Joke = mongoose.model('Joke', {
  title: String,
  body: String,
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tematica' }],
});

const User = mongoose.model('User', {
  name: String,
  password: String,
});

const Topic = mongoose.model('Topic', {
  name: String,
});

// Creación de datos iniciales
const initDB = async () => {
  // Elimina datos existentes
  await Promise.all([Joke.deleteMany(), User.deleteMany(), Topic.deleteMany()]);

  // Crea usuarios
  const manolito = await User.create({ name: 'Manolito', password: '123456' });
  const pepe = await User.create({ name: 'Pepe', password: 'password' });
  const isabel = await User.create({ name: 'Isabel', password: 'contraseña' });
  const pedro = await User.create({ name: 'Pedro', password: 'admin123' });

  // Crea temáticas
  const humorNegro = await Topic.create({ name: 'Humor Negro' });
  const humorAmarillo = await Topic.create({ name: 'Humor Amarillo' });
  const chistesVerdes = await Topic.create({ name: 'Chistes Verdes' });

  // Crea chistes
  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: manolito._id,
    topics: [humorNegro._id, humorAmarillo._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pepe._id,
    topics: [humorNegro._id, humorAmarillo._id],
  });

  // Humor Negro
  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: isabel._id,
    topics: [humorNegro._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pedro._id,
    topics: [humorNegro._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pepe._id,
    topics: [humorNegro._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: manolito._id,
    topics: [humorNegro._id],
  });

  // Humor Amarillo
  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: isabel._id,
    topics: [humorAmarillo._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pedro._id,
    topics: [humorAmarillo._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pepe._id,
    topics: [humorAmarillo._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: manolito._id,
    topics: [humorAmarillo._id],
  });

  // Chistes Verdes
  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: isabel._id,
    topics: [chistesVerdes._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pedro._id,
    topics: [chistesVerdes._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: pepe._id,
    topics: [chistesVerdes._id],
  });

  await Joke.create({
    title: faker.lorem.paragraph(1),
    body: faker.lorem.paragraph(1),
    autor: manolito._id,
    topics: [chistesVerdes._id],
  });

  console.log('Datos iniciales creados con éxito.');

  console.log('Autores:');

  console.log('Manolito id: ' + manolito._id);
  console.log('Pepe id: ' + pepe._id);
  console.log('Isabel id: ' + isabel._id);
  console.log('Pedro id: ' + pedro._id);

  console.log('Tematicas:');
  console.log('Humor negro id: ' + humorNegro._id);
  console.log('Humor Amarillo id: ' + humorAmarillo._id);
  console.log('Chiste verde id: ' + chistesVerdes._id);

  const jokes_manolito = await Joke.find({autor: manolito._id});
  console.log('Chistes de manolito:');
  console.log(jokes_manolito);

  const jokes_negros = await Joke.find({topics: humorNegro._id});
  console.log('Chistes de humor negro:');
  console.log(jokes_negros);

  const jokes_negros_manolito = await Joke.find({
    $and: [{topics: humorNegro._id},{autor:manolito._id}]
  });
  console.log('Chistes de humor negro y manolito:');
  console.log(jokes_negros_manolito);
};

// Inicialización de datos y servidor
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
});

module.exports = app;
