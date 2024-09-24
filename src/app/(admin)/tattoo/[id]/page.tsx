import { TattooNote } from './tattoo-note';

export default function Page({ params }: { params: { id: number } }) {
  return (<TattooNote params={params} />);
}