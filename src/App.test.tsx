import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders grid', () => {
  render(<App />)
  const linkElement = screen.getByText('4 - 4')
  expect(linkElement).toBeInTheDocument()
})
