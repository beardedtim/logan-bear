import styled from '@emotion/styled'

import { formatDistanceToNowStrict } from 'date-fns'

import { Page } from '../../components/Page'
import { SiteHeader } from '../../components/SiteHeader'
import { Body1, Body2, Heading, A } from '../../components/Typography'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

import EventModel from '../../models/events'
import { Button } from '../../components/Button'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { useRouter } from 'next/router'

const Content = styled.div`
  padding: calc(2 * var(--spacing));
  max-width: 1540px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  width: 100%;
  padding: calc(4 * var(--spacing));
  display: flex;
  flex-direction: column;
  border-radius: 4.5px;
  border: 1px solid rgba(0, 0, 0, 1);

  > * {
    margin-bottom: calc(4 * var(--spacing));
  }

  button[type='submit'] {
    background: var(--primary-color);
  }

  button[type='reset'] {
    background: var(--warn-color);
  }
`

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: calc(4 * var(--spacing)) 0;
`

interface Props {
  event: any
}

const EventControls = styled.div`
  display: flex;

  button:not(:last-of-type) {
    margin-right: 1rem;
  }

  button {
    transition: all 0.2s ease-in;
  }

  button[data-type='delete'] {
    border: 1px solid var(--warn-color);
    color: var(--warn-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing) calc(4 * var(--spacing));
  }

  button[data-type='delete']:hover {
    border: 1px solid var(--warn-color);
    background: var(--warn-color);
    color: var(--white);
  }

  button[data-type='edit'] {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing) calc(4 * var(--spacing));
  }

  button[data-type='edit']:hover {
    border: 1px solid var(--primary-color);
    background: var(--primary-color);
    color: var(--white);
  }
`

const Events = ({ event }: Props) => {
  const router = useRouter()
  const deleteEvent = () => {
    fetch(`/api/events/${event._id}`, {
      method: 'DELETE',
    }).then(() => router.push('/events'))
  }
  return (
    <Page>
      <SiteHeader />
      <Content>
        <Heading variant="h1">{event.title}</Heading>
        <Heading variant="h4">
          Happen{new Date() > new Date(event.date) ? 'ed' : 's'}:{' '}
          {formatDistanceToNowStrict(new Date(event.date), { addSuffix: true })}
        </Heading>
        <EventControls>
          <Button
            data-type="edit"
            title="Edit Event"
            aria-label="Edit Event"
            onClick={() => router.push(`/events/edit/${event._id}`)}
          >
            <span className="material-icons">edit</span>
          </Button>
          <Button
            data-type="delete"
            title="Delete Event"
            aria-label="Delete Event"
            onClick={() => {
              confirmAlert({
                title: `About to Delete`,
                message: `Are you sure you want to delete ${event.title}?`,
                buttons: [
                  {
                    label: 'Yes, sir!',
                    onClick: deleteEvent,
                  },
                  {
                    label: 'Naw...',
                    onClick: () => {},
                  },
                ],
              })
            }}
          >
            <span className="material-icons">delete_forever</span>
          </Button>
        </EventControls>

        <Body1>
          <span style={{ whiteSpace: 'pre-wrap' }}>{event.description}</span>
        </Body1>
        <Controls>
          <Link href="/events" passHref>
            <A>See All Events</A>
          </Link>
        </Controls>
      </Content>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id
  const event = await EventModel.findById(id).lean()

  return {
    props: {
      event: {
        ...event,
        _id: event._id.toString(),
        createdAt: new Date(event.createdAt).toISOString(),
        updatedAt: new Date(event.updatedAt).toISOString(),
      },
    },
  }
}

export default Events
