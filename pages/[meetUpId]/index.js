import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail meetups={props.meetupData} />
    </>
  );
}

export default MeetupDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://udemy:udemy123@udemy-course.8d1jc.mongodb.net/react-nextsection?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  let remeetups = meetups.map((meetup) => ({
    params: { meetUpId: meetup._id.toString() },
  }));
  //console.log('remeetups', remeetups);
  client.close();
  return {
    fallback: 'blocking', // lock page data, false=hanya yg ada di list, true=bebas
    paths: remeetups,
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetUpId;

  const client = await MongoClient.connect(
    'mongodb+srv://udemy:udemy123@udemy-course.8d1jc.mongodb.net/react-nextsection?retryWrites=true&w=majority'
  );

  //console.log('meetUpId', meetUpId);

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetupsCollectionarr = await meetupsCollection.find().toArray();
  //console.log('meetupsCollectionarr', meetupsCollectionarr);
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetUpId),
  });
  //console.log('selectedMeetup', selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
