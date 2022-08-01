import classes from './MeetupDetail.module.css';

function MeetupDetails(props) {
  console.log('props', props);
  return (
    <section className={classes.detail}>
      <img src={props.meetups.image} alt={props.meetups.title} />
      <h1>{props.meetups.title}</h1>
      <address>{props.meetups.address}</address>
      <p>{props.meetups.description}</p>
    </section>
  );
}

export default MeetupDetails;
