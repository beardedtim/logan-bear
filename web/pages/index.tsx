import { useState, useEffect } from 'react'
import SiteHeader from '../components/SiteHeader'
import { Heading, Body1, Body2 } from '../components/Typography'
import { Page } from '../components/Page'
import { Divider } from '../components/Divider'
import { Avatar } from '../components/Image'

import styled from '@emotion/styled'
import Link from 'next/link'
import EventsModel from '../models/events'
import { formatDistanceToNowStrict } from 'date-fns'
import dbConnect from '../lib/dbConnect'

const Cards = styled.div`
  padding: calc(2 * var(--spacing));
  max-width: 1540px;
  margin: 0 auto;
`

const DashboardCard = styled.div`
  background: var(--white);
  color: var(--black);
  padding: calc(2 * var(--spacing));
  margin-bottom: calc(4 * var(--spacing));
`

const TwoSided = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .side {
    flex: 1 1 auto;
    padding: calc(4 * var(--spacing));
    max-width: 35rem;
    display: flex;
    flex-direction: column;
  }

  .side-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    p {
      max-width: 20rem;
    }
  }

  @media screen and (min-width: 850px) {
    .side-group {
      flex-direction: row;
    }
  }
`

const EventCard = styled.div`
  padding: calc(4 * var(--spacing));
  display: flex;
  flex-direction: column;
  border: 1px solid var(--white);
  border-radius: 4.5px;
  margin-bottom: 1rem;

  &.over {
    opacity: 0.25;
    text-decoration: line-through;
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
  <EventCard className={new Date() < new Date(date) ? 'future' : 'over'}>
    <Heading variant="h4">{title}</Heading>
    <Body2>
      {formatDistanceToNowStrict(new Date(date), { addSuffix: true })}
    </Body2>
  </EventCard>
)

const EventsWrap = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--black);
    border-radius: 4.5px;
  }
`

const DaysEvents = ({ events }: { events: any[] }) => (
  <EventsWrap>
    {events.map((event) => (
      <Link href={`/events/${event._id}`} key={event._id} passHref>
        <a>
          <Event title={event.title} _id={event._id} date={event.date} />
        </a>
      </Link>
    ))}
  </EventsWrap>
)

const WeatherCard = () => {
  const [currentData, setData] = useState()
  const [zipcode] = useState('37922')

  useEffect(() => {
    fetch(
      `${process.env.WEATHER_API_BASE}/forecast.json?key=${process.env.WEATHER_API_AUTH_KEY}&days=10&q=${zipcode}`
    )
      .then((x) => x.json())
      .then(setData)
  }, [zipcode])

  if (!currentData) {
    return null
  }

  const info = currentData as any

  const [todaysWeather, ...forecast] = info.forecast.forecastday

  const currentWeather = info.current
  const currentLocation = info.location

  return (
    <div>
      <TwoSided>
        <div className="side">
          <Heading variant="h4">Today</Heading>
          <Avatar
            src={`http:${currentWeather.condition.icon}`}
            alt={currentWeather.condition.text}
            size={50}
            background="var(--black)"
          />
          <Divider margin={5} />
          <Body1>
            Outside Feels like:{' '}
            <span>
              {currentWeather.feelslike_f}&#8457;/
              {currentWeather.feelslike_c}&#8451;
            </span>
          </Body1>
          <Body1>
            Wind Gusts:{' '}
            <span>
              {currentWeather.gust_mph}mph/
              {currentWeather.gust_kph}kph {currentWeather.wind_dir}
            </span>
          </Body1>
          <Body1>
            High of:{' '}
            <span>
              {todaysWeather.day.maxtemp_f}&#8457;/
              {todaysWeather.day.maxtemp_c}&#8451;
            </span>
          </Body1>
          <Body1>
            Sun Rise/Set ({currentLocation.tz_id}):{' '}
            <span>
              {todaysWeather.astro.sunrise} / {todaysWeather.astro.sunset}
            </span>
          </Body1>
        </div>
        <div className="side">
          <Heading variant="h4">Future</Heading>
          <div className="side-group">
            <Avatar
              src={`http:${forecast[0].day.condition.icon}`}
              alt={forecast[0].day.condition.text}
              size={50}
              background="var(--black)"
            />
            <Body1>
              Tomorrow: {forecast[0].day.condition.text}{' '}
              {forecast[0].day.avgtemp_f}&#8457;/{forecast[0].day.avgtemp_c}
              &#8451;. {forecast[0].day.condition.text} with a{' '}
              {forecast[0].day.daily_chance_of_snow}% of snow and a{' '}
              {forecast[0].day.daily_chance_of_rain}% of rain.
            </Body1>
          </div>
          <Divider margin={5} padding={0.1} />
          <div className="side-group">
            <Avatar
              src={`http:${forecast[1].day.condition.icon}`}
              alt={forecast[0].day.condition.text}
              size={50}
              background="var(--black)"
            />
            <Body1>
              Next Day: {forecast[1].day.condition.text}{' '}
              {forecast[1].day.avgtemp_f}&#8457;/{forecast[1].day.avgtemp_c}
              &#8451;. {forecast[1].day.condition.text} with a{' '}
              {forecast[1].day.daily_chance_of_snow}% of snow and a{' '}
              {forecast[1].day.daily_chance_of_rain}% of rain.
            </Body1>
          </div>
        </div>
      </TwoSided>
    </div>
  )
}

const TodaysEventsEl = styled.div`
  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.25s ease-in-out;
  }

  a:hover {
    color: var(--primary-color);
  }
`

const EventsList = ({ today, tomorrow }: any) => (
  <TodaysEventsEl>
    <TwoSided>
      <div className="side">
        <Heading variant="h4">Today</Heading>
        {today.length ? (
          <DaysEvents events={today} />
        ) : (
          <Body2>No events today! Park time?!</Body2>
        )}
      </div>
      <div className="side">
        <Heading variant="h4">Tomorrow</Heading>
        {tomorrow.length ? (
          <DaysEvents events={tomorrow} />
        ) : (
          <Body2>No events tomorrow! Plan something fun?!</Body2>
        )}
      </div>
    </TwoSided>
    <Link href="/events" passHref>
      <a>
        <Heading variant="h4">See All Events</Heading>
      </a>
    </Link>
  </TodaysEventsEl>
)

const Home = ({ todaysEvents, tomorrowsEvents }: any) => (
  <Page>
    <SiteHeader />
    <Cards>
      <DashboardCard>
        <Heading variant="h2">How's The Weather Looking?</Heading>
        <WeatherCard />
      </DashboardCard>
      <DashboardCard>
        <Heading variant="h2">Anything Important Coming Up?</Heading>
        <EventsList today={todaysEvents} tomorrow={tomorrowsEvents} />
      </DashboardCard>
    </Cards>
  </Page>
)

export const getServerSideProps = async () => {
  await dbConnect()
  const clean = ({ _id, createdAt, updatedAt, ...rest }: any) => ({
    _id: _id.toString(),
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
    ...rest,
  })

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0))
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999))
  const endOfNextDay = new Date(endOfDay.setHours(24))
  const todaysEvents = await EventsModel.find({
    date: {
      $gte: startOfDay.toISOString(),
      $lte: endOfDay.toISOString(),
    },
  }).lean()

  const tomorrowsEvents = await EventsModel.find({
    date: {
      $gte: endOfDay.toISOString(),
    },
  }).lean()

  return {
    props: {
      todaysEvents: todaysEvents.map(clean),
      tomorrowsEvents: tomorrowsEvents.map(clean),
    },
  }
}

export default Home
