import { MultiStepForm } from "./new-tattoo/multi-step-form";
import { RecentTattoo } from "./recent-tattoo/recent-tattoo";

export default function Home() {
  return (
    <div className="flex flex-col p-8 w-full gap-4">
      <MultiStepForm />
      <RecentTattoo />
    </div>
  );
}