import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

export default function Home(props) {
  console.log('porps', props);
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={propts.meetups} />
    </>
  );
}

// // Server Side Rendering (SSR)
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// Server Side Generation (SSG)
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://udemy:udemy123@udemy-course.8d1jc.mongodb.net/react-nextsection?retryWrites=true&w=majority'
  );

  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  // console.log('meetups', meetups);

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600, // re update per second
  };
}
