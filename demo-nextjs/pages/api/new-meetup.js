// POST /api/new-meetup
import { MongoClient } from 'mongodb'

async function addMeetupHandler (req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data
        const client = await MongoClient.connect('mongodb+srv://minh1990:minh10081990@cluster0.xuz3r0w.mongodb.net/meetupdb?retryWrites=true&w=majority')
        const db = client.db()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)
        console.log('result: ', result)
        client.close()

        res.status(201).json({message: 'Meetup inserted'})
    }
}

export default addMeetupHandler