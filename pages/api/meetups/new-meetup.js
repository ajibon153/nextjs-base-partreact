import { MongoClient } from 'mongodb';

// /api/new-meetup
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    //console.log('handler sdata', data);
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://udemy:udemy123@udemy-course.8d1jc.mongodb.net/react-nextsection?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    //console.log('result', result);

    client.close();

    res.status(201).json({
      message: 'Meetup inserted!',
    });
  }
}
