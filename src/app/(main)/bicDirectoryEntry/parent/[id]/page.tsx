import { notFound } from 'next/navigation'
import Bic from './bic';

export default function GroupPage({ params }: { params: { id: string } }) {
  return (
	  <Bic id={params.id} />
  )
}