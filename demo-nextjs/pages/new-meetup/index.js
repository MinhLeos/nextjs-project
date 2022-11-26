import Head from 'next/head'

import { useRouter } from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetUp() {
    const router = useRouter()

    async function addMeetupHandler (enteredMeetupData) {
        console.log(enteredMeetupData)
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log('send request', data)

        router.push('/')
    }

    return ( 
        <>
            <Head>
                <title>Add New Meetup</title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
     );
}

export default NewMeetUp;