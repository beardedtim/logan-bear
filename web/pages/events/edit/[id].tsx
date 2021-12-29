import styled from '@emotion/styled'

import { Page } from '../../../components/Page'
import { SiteHeader } from '../../../components/SiteHeader'
import { Heading } from '../../../components/Typography'
import { Input } from '../../../components/Input'
import { Button, ButtonGroup } from '../../../components/Button'
import EventModel from '../../../models/events'
import { GetServerSideProps } from 'next'
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

interface Props {
  event: any
}

const CreationForm = ({ event }: any) => {
  const router = useRouter()
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement)

        const data: any = {}

        for (const [key, value] of form.entries()) {
          console.log(value, 'this is value')
          if (key === 'date') {
            data[key] = new Date(value as string).toISOString()
          } else {
            data[key] = value
          }
        }

        fetch(`/api/events/${event._id}`, {
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          router.push(`/events/${event._id}`)
        })
      }}
    >
      <Heading variant="h3">Edit Event "{event.title}"</Heading>

      <Input
        id="title"
        name="title"
        label="Event title"
        required
        defaultValue={event.title}
      />
      <Input
        id="description"
        name="description"
        label="Event Description"
        variant="textarea"
        minRows={10}
        required
        defaultValue={event.description}
      />
      <Input
        id="date"
        name="date"
        label="Event Date and Time"
        variant="datetime-local"
        required
        defaultValue={new Date(
          new Date(event.date).setMinutes(
            new Date(event.date).getMinutes() -
              new Date(event.date).getTimezoneOffset()
          )
        )
          .toISOString()
          .slice(0, -1)}
      />
      <ButtonGroup>
        <Button type="submit">Create</Button>
        <Button type="reset">Clear</Button>
      </ButtonGroup>
    </Form>
  )
}

const Events = ({ event }: Props) => {
  return (
    <Page>
      <SiteHeader title="Events" />
      <Content>
        <Heading variant="h2"></Heading>
        <CreationForm event={event} />
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
