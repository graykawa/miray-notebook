import WrapperRouter from './router'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {

  return (
    <>
      <WrapperRouter />
      <Toaster />
    </>
  )
}
