import React from 'react'
import { Column } from '../Layout/Layout'
import './Information.scss';
import Notification from '../Notification/Notification';
import Cohort from '../Cohort/Cohort';
import Testimonials from '../Testimonials/Testimonials';

const Information = () => {
  return (
    <Column className='information'>
        <Notification />
        <Cohort />
        <Testimonials />
    </Column>
  )
}

export default Information