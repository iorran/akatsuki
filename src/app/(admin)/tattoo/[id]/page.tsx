import { getTattooById, Tattoo } from '@/lib/db/queries/select';
import { TattooDetails } from './tattoo-details';

export default async function Page({ params }: { params: { id: number } }) {
  try {
    const tattoos = await getTattooById(params.id);
    if (!tattoos || tattoos.length === 0) {
      return <p className="text-red-500">No tattoo data found.</p>;
    }
    const tattoo: Tattoo = tattoos[0];

    return (
      <TattooDetails tattoo={tattoo} />
    );
  } catch (error) {
    console.error('Error fetching tattoo data:', error);
    return <p className="text-red-500">An error occurred while fetching tattoo data.</p>;
  }
}