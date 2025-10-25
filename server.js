import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { supabase } from './db.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/articulos', async (req, res) => {
  const { data, error } = await supabase.from('articulos').select('*').order('id', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

app.post('/articulos', async (req, res) => {
  const { nombre, coste, venta } = req.body
  const { error } = await supabase.from('articulos').insert([{ nombre, coste, venta }])
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json({ mensaje: 'Artículo añadido con éxito' })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor escuchando en puerto ${port}`))
