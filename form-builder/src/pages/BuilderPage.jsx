import React from 'react'
import Categorize from '../components/Categorize'
import Title from '../components/Title'
import Cloze from '../components/Cloze'
import Comprehension from '../components/Comprehension'

function BuilderPage() {
  return (
    <>
        <Title />
        <Categorize />
        <Cloze/>
        <Comprehension/>
    </>
  )
}

export default BuilderPage