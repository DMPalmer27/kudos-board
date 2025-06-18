const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


/* 
    Update a card (upvotes or pinned)
*/
router.put('/:cardID', async (req, res)=>{
    const cardID = parseInt(req.params.cardID);
    const { votes, pinned } = req.body;
    if (votes && votes < 0){
        return res.status(400).json({error: "votes must be a non-zero integer"});
    }
    try {
        const updatedCard = await prisma.Card.update({
            where: {card_id: cardID},
            data: {
                votes,
                pinned,
            }
        });
        res.json(updatedCard);
    } catch (error){
        console.error(error);
        res.status(500).json({error: `failed to update card ${cardID}`})
    }
})

/*
    Delete a card
*/
router.delete('/:cardID', async(req, res)=>{
    const cardID = parseInt(req.params.cardID);
    try {
        const deletedCard = await prisma.Card.delete({
            where: {card_id: cardID}
        });
        res.json(deletedCard);
    } catch (error) {
        console.error(error);
        res.status(500).json(`failed to delete card ${cardID}`)
    }
})

/*
    Get a card and its comments
*/
router.get('/:cardID', async(req, res)=>{
    const cardID = parseInt(req.params.cardID);
    try {
        const card = await prisma.Card.findUnique({
            where: {card_id: cardID},
            include: {comments: true}
        })
        res.json(card);
    } catch (error){
        console.error(error);
        res.status(500).json({error: `failed to load card ${cardID}`})
    }
})

/*
    Get just a card's comments
*/
router.get('/:cardID/comments', async(req, res)=>{
    const cardID = parseInt(req.params.cardID);
    try {
        const card = await prisma.Card.findUnique({
            where: {card_id: cardID},
            include: {comments: true}
        })
        res.json(card.comments);
    } catch (error){
        console.error(error);
        res.status(500).json({error: `failed to load card ${cardID}'s comments`})
    }
})

/*
    Add comment to a card
*/
router.post('/:cardID/comments', async (req, res)=>{
    const cardID = parseInt(req.params.cardID);
    const { message, author } = req.body;
    if (!message){
        return res.status(400).json({error: "you must specify a comment's message"});
    }
    try {
        const comment = await prisma.Comment.create({
            data: {
                message,
                author,
                card_id: cardID
            }
        });
        res.status(201).json(comment);
    } catch (error){
        console.error(error);
        res.json({error: "failed to create comment"})
    }
})



module.exports = router