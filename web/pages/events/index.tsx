import { useState, useCallback, useEffect } from 'react'

import styled from '@emotion/styled'

import { formatDistanceToNowStrict, format, addDays } from 'date-fns'

import { Page } from '../../components/Page'
import { SiteHeader } from '../../components/SiteHeader'
import { Body2, Heading } from '../../components/Typography'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { Button, ButtonGroup } from '../../components/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { Avatar } from '../../components/Image'

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

const EventCard = styled.div`
  padding: calc(4 * var(--spacing));
  display: flex;
  flex-direction: column;
  border: 1px solid var(--white);
  border-radius: 4.5px;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
  }
`

const Event = ({
  title,
  _id,
  date,
}: {
  title: string
  _id: string
  date: string
}) => (
  <Link href={`/events/${_id}`}>
    <a title="See Event" aria-label="See Event">
      <EventCard className={new Date() < new Date(date) ? 'future' : 'over'}>
        <Heading variant="h4">{title}</Heading>
        <Body2>
          {formatDistanceToNowStrict(new Date(date), { addSuffix: true })}
        </Body2>
      </EventCard>
    </a>
  </Link>
)

const EventList = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: inherit;
  }
`

const DaysEvents = ({ events }: { events: any[] }) => (
  <EventList>
    {events.map((event) => (
      <Event
        title={event.title}
        _id={event._id}
        date={event.date}
        key={event._id}
      />
    ))}
  </EventList>
)

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: calc(4 * var(--spacing)) 0;
`

interface Props {
  start: string
}

const ToggleHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
    transition: all 0.25s ease-out;
  }

  .shown {
    transform: rotate(180deg);
  }
`

const ToggleBody = styled.div`
  visibility: collapse;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.175s ease-in-out;

  &.shown {
    visibility: visible;
    opacity: 1;
    height: auto;
    overflow: visible;
  }
`

const CreationForm = ({
  setDirty,
  currentDaySelected,
}: {
  setDirty: (isDirty: boolean) => void
  currentDaySelected: Date
}) => {
  const [show, setShow] = useState(false)

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

        fetch('/api/events', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(() => {
          ;(e.target as HTMLFormElement).reset()
          setDirty(true)
          setShow(false)
        })
      }}
    >
      <ToggleHeader>
        <Heading variant="h3">Add Event</Heading>
        <Avatar
          src="/images/down-arrow.png"
          alt="toggle icon"
          width={50}
          height={50}
          className={show ? 'shown' : ''}
          onClick={() => {
            setShow((isShown) => !isShown)
          }}
        />
      </ToggleHeader>

      <ToggleBody className={show ? 'shown' : ''}>
        <Input id="title" name="title" label="Event title" required />
        <Input
          id="description"
          name="description"
          label="Event Description"
          variant="textarea"
          minRows={10}
          required
        />
        <Input
          id="date"
          name="date"
          label="Event Date and Time"
          variant="datetime-local"
          required
          defaultValue={new Date(
            new Date(
              new Date(
                new Date().setMinutes(
                  currentDaySelected.getMinutes() -
                    new Date().getTimezoneOffset() +
                    30
                )
              ).setSeconds(0)
            ).setMilliseconds(0)
          )
            .toISOString()
            .slice(0, -1)}
        />
        <ButtonGroup>
          <Button type="submit">Create</Button>
          <Button type="reset">Clear</Button>
        </ButtonGroup>
      </ToggleBody>
    </Form>
  )
}

const Navigation = ({
  setDay,
}: {
  setDay: (fn: (d: Date) => Date) => void
}) => (
  <Controls>
    <Button
      className="secondary"
      aria-label="See Previous Day"
      title="See Previous Day"
      onClick={() => {
        setDay((day) => addDays(new Date(day), -1))
      }}
    >
      Prev Day
    </Button>
    <Button
      onClick={() => {
        setDay(() => new Date(new Date().setHours(0, 0, 0, 0)))
      }}
      aria-label="See Today"
      title="See today"
    >
      Today
    </Button>
    <Button
      className="primary"
      aria-label="See Next Day"
      title="See Next Day"
      onClick={() => {
        setDay((day) => addDays(new Date(day), 1))
      }}
    >
      Next Day
    </Button>
  </Controls>
)

const Events = ({ start }: Props) => {
  const router = useRouter()
  const [currentEventList, setCurrentEventList] = useState([])

  const [currentDaySelected, setCurrentDaySelected] = useState(
    new Date(start || new Date().setHours(0, 0, 0, 0))
  )

  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (router.query.start) {
      if (router.query.start !== currentDaySelected.toISOString()) {
        setCurrentDaySelected(new Date(router.query.start as string))
      }
    }
  }, [router.query])

  useEffect(() => {
    router.push({
      query: {
        ...router.query,
        start: currentDaySelected.toISOString(),
      },
    })
  }, [currentDaySelected])

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        start: currentDaySelected.toISOString(),
      },
    })

    fetch(
      `/api/events?start=${encodeURIComponent(
        currentDaySelected.toISOString()
      )}&end=${encodeURIComponent(
        new Date(
          new Date(currentDaySelected).setHours(24, 0, 0, 0)
        ).toISOString()
      )}`
    )
      .then((x) => x.json())
      .then(({ data }) => {
        setCurrentEventList(data)
      })
  }, [currentDaySelected])

  useEffect(() => {
    if (isDirty) {
      fetch(
        `/api/events?start=${encodeURIComponent(
          currentDaySelected.toISOString()
        )}&end=${encodeURIComponent(
          new Date(
            new Date(currentDaySelected).setHours(24, 0, 0, 0)
          ).toISOString()
        )}`
      )
        .then((x) => x.json())
        .then(({ data }) => {
          setCurrentEventList(data)
          setIsDirty(false)
        })
    }
  }, [isDirty, currentDaySelected])

  return (
    <Page>
      <SiteHeader title="Events" />
      <Content>
        <Heading variant="h2">
          {format(new Date(currentDaySelected), 'iii LLL do')}
        </Heading>
        <Navigation setDay={setCurrentDaySelected} />
        <DaysEvents events={currentEventList} />
        <CreationForm
          setDirty={setIsDirty}
          currentDaySelected={currentDaySelected}
        />
      </Content>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      start: ctx.query.start
        ? new Date(ctx.query.start as string).toISOString()
        : null,
    },
  }
}

export default Events
