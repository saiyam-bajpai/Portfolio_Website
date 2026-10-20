import React, { useEffect } from 'react'
import { ContinuousCinematicJourney } from '../components/cinematic/ContinuousCinematicJourney'

export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Saiyam Bajpai — Machine Learning, Computer Vision & Explainable AI'
  }, [])

  return <ContinuousCinematicJourney />
}
