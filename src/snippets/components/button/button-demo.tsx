import { Button } from './button'

function ButtonDemo() {
  return (
    <>
      <h2>Button Component Demo</h2>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <Button primary onClick={() => alert('Primary clicked')}>
          Primary Button
        </Button>
        <Button secondary onClick={() => alert('Secondary clicked')}>
          Secondary Button
        </Button>
        <Button primary disabled>
          Disabled Primary
        </Button>
        <Button secondary disabled>
          Disabled Secondary
        </Button>
      </div>
    </>
  )
}

export default ButtonDemo

