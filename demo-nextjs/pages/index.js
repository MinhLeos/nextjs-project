import Head from 'next/head'

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'


function HomePage(props) {
    return ( 
        <>
            <Head>
                <title>NextJs Meetup</title>
                <meta name='description' content='A first web page with NextJS' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </> 
    );
}

// Server-side rendering
// export async function getServerSideProps() {
//     // fetch data, call API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// // Static Generation
export async function getStaticProps() {
    // fetch data, call API
    const client = await MongoClient.connect('mongodb+srv://minh1990:minh10081990@cluster0.xuz3r0w.mongodb.net/meetupdb?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    console.log('result: ', meetups)
    client.close()

    return {
        props: {
            meetups: meetups.map((meetup) => {
                return {
                    title:meetup.title,
                    image:meetup.image,
                    address:meetup.address,
                    description:meetup.description,
                    id:meetup._id.toString()
                }
            })
        },
        revalidate: 20
    }
}

export default HomePage;