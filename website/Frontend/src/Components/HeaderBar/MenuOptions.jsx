import React from 'react'
import Button from './Button'
import {twMerge} from 'tailwind-merge'

export default function MenuOptions({className, onHomeClick, onSkillsClick, onAskClick, onContactClick }) {
  return (
    <div className = {twMerge("flex gap-2",className)}>
      <Button onClick={onHomeClick} className = "text-red-orange hover:bg-red-orange active:ring-red-orange!">Home</Button>
      <Button onClick={onSkillsClick}>Skills</Button>
      <Button onClick = {onAskClick}>Ask Me</Button>
      <Button onClick = {onContactClick}>Contact Me</Button>
    </div>
  )
}
