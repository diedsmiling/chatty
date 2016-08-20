// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Chat from './Chat'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Chat
})

export default createRoutes
