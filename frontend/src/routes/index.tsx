import { createFileRoute } from '@tanstack/react-router'
import Paywall from '../components/paywall'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Paywall/>
}
