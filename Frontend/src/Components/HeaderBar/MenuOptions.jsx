import React from 'react'
import Button from './Button'
import {twMerge} from 'tailwind-merge'

export default function MenuOptions({className, onAboutClick, onSkillsClick, onProjectsClick, onContactClick }) {
  return (
    <div className = {twMerge("flex gap-2",className)}>
      <Button onClick={onAboutClick} className = "text-red-orange hover:bg-red-orange active:ring-red-orange!">About Me</Button>
      <Button onClick={onSkillsClick}>Skills</Button>
      <Button onClick = {onProjectsClick}>Projects</Button>
      <Button onClick = {onContactClick}>Contact Me</Button>
    </div>
  )
}
