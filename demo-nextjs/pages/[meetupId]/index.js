import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetUpDetail from "../../components/meetups/MeetupDetail";

function MeetUpDetails(props) {
    return ( 
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            <MeetUpDetail 
            image = {props.image}
            title = {props.title}
            address = {props.address}
            description = {props.description}
        />
        </>
    );
}

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://minh1990:minh10081990@cluster0.xuz3r0w.mongodb.net/meetupdb?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const listIds = await meetupsCollection.find({}, {_id: 1}).toArray()
    console.log('listIds: ', listIds)
    client.close()

    return {
        paths: 
            listIds.map((data) => {
                return {
                    params: {
                        meetupId: data._id.toString()
                    }
                }
            }),       
        fallback: false
    }
}

// // Static Generation
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    console.log('meetupId', meetupId);
    // fetch data, call API
    const client = await MongoClient.connect('mongodb+srv://minh1990:minh10081990@cluster0.xuz3r0w.mongodb.net/meetupdb?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
    console.log('selectedMeetup: ', selectedMeetup)
    client.close()

    return {
        props: {
            image: selectedMeetup.image,
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            description: selectedMeetup.description,
            id: meetupId
        },
        // revalidate: 200000
    }
}
export default MeetUpDetails;