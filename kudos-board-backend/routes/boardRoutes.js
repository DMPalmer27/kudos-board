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

/*
    Delete a board
*/
router.delete('/:boardID', async (req, res)=>{
    const boardID = parseInt(req.params.boardID);
    try {
        const deletedBoard = await prisma.Board.delete({
            where: {board_id: boardID}
        })
        res.json(deletedBoard);
    } catch (error){
        console.error(error);
        res.status(500).json({error: "failed to delete board"})
    }
})

/*
    Get a board's information, including its cards sorted with pinned first
*/
router.get('/:boardID', async (req, res)=>{
    const boardID = parseInt(req.params.boardID);
    try {
        const board = await prisma.Board.findUnique({
            where: {board_id: boardID},
            include: {cards: {orderBy: {"pinned": 'desc'}}}
        })
        res.json(board)
    } catch (error){
        console.error(error);
        res.status(500).json({error: `failed to fetch board ${boardID} details`})
    }
})

/*
    Get just a board's cards sorted with pinned first
*/
router.get('/:boardID/cards', async (req, res)=>{
    const boardID = parseInt(req.params.boardID);
    try {
        const board = await prisma.Board.findUnique({
            where: {board_id: boardID},
            include: {cards: {orderBy: {"pinned": 'desc'}}}
        })
        res.json(board.cards)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: `failed to fetch board ${boardID}'s cards`})
    }
})

/*
    Add a card to a board
*/
router.post('/:boardID/cards', async (req, res)=>{
    const boardID = parseInt(req.params.boardID);
    const { message, gif, author } = req.body;
    if (!message || !gif){
        return res.status(400).json({error: "you must specify a message and gif"})
    }
    try {
        const card = await prisma.Card.create({
            data: {
                message,
                gif,
                author,
                board_id: boardID
            }
        });
        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "error creating card"})
    }
})

module.exports = router;