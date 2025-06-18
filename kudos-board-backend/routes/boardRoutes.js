const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



/* 
    Retrieve all boards for the main page (can add search term and sort metric)
*/
router.get('/', async (req, res)=>{
    const { search, category, recent } = req.query;
    const filters = {};
    if (search){
        filters.title = {
            contains: search,
            mode: "insensitive"
        };
    }
    if (category){
        filters.category = category;
    }
    const orderBy = recent === 'true' ? {time: 'desc'} : {}
    try {
        const boards = await prisma.Board.findMany({
            where: filters,
            orderBy,
        });
        res.json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "failed to fetch boards"});
    }
})

/* 
    Create a board
*/
router.post('/', async (req, res)=>{
    const { title, category, author, image } = req.body;
    if (!title || !category){
        return res.status(400).json({error: 'title and category are required'});
    }
    try {
        const newBoard = await prisma.Board.create({
            data: {
                title,
                category,
                author,
                image
            }
        });
        res.status(201).json(newBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "failed to create board"});
    }
})

module.exports = router;