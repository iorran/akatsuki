"use client"

import { PersonalInformationForm } from "./steps/personal-information-form";
import { HealthForm } from "./steps/health-form";
import { useNewTattooFormStore } from "./store";
import { BeforeProcedureForm } from "./steps/before-procedure";
import { AfterProcedureForm } from "./steps/after-procedure";

export const MultiStepForm = () => {
  const step = useNewTattooFormStore((state) => state.step);
  const formsMap = [
    <PersonalInformationForm />,
    <HealthForm />,
    <BeforeProcedureForm />,
    <AfterProcedureForm />,
  ]

  return (
    <div>
      {formsMap[step]}
    </div>
  );
};
