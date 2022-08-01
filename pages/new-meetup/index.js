import { useRouter } from 'next/router';
import NewMeetUpFrom from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

export default function Meetup() {
  const router = useRouter();

  async function addMeetUpHandler(enteredMeetupData) {
    console.log('enteredMeetupData', enteredMeetupData);
    const response = await fetch('/api/meetups/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('data', data);

    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Add new Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities'
        />
      </Head>
      <NewMeetUpFrom onAddMeetup={addMeetUpHandler} />
    </>
  );
}
