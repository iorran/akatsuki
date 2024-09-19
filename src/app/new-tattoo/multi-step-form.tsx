"use client"

import { PersonalInformationForm } from "./personal-information-form";
import { HealthForm } from "./health-form";
import { useNewTattooFormStore } from "./store";
import { BeforeProcedureForm } from "./before-procedure";
import { AfterProcedureForm } from "./after-procedure";

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
