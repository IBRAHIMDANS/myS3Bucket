import { helloWorld, devNull } from '../src/main'
import { expect } from 'chai'

describe(':: helloWorld', (): void => {
  it('helloWorld("Elixir")', () => {
    expect(helloWorld('Elixir')).equal(`🦁 I love Elixir!`)
  })
})

describe(':: devNull', (): void => {
  it('devNull()', () => {
    expect(devNull()).eql({ hello: 'Efrei' })
  })
})
