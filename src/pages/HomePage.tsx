import React, { useEffect } from 'react'
import { ContinuousCinematicJourney } from '../components/cinematic/ContinuousCinematicJourney'

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Saiyam Bajpai'
  }, [])

  return <ContinuousCinematicJourney />
}
