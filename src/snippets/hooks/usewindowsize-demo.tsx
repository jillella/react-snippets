import { useWindowSize } from '../../hooks/useWindowSize'

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize()

  return (
    <>
      <div>
        <p>Window size: {width} x {height}</p>
      </div>
    </>
  )
}

export default UseWindowSizeDemo