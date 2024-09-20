"use client"

import { PersonalInformationForm } from "./steps/personal-information-form";
import { HealthForm } from "./steps/health-form";
import { useNewTattooFormStore } from "./store";
import { BeforeProcedureForm } from "./steps/before-procedure-form";
import { AfterProcedureForm } from "./steps/after-procedure-form";
import { SignatureForm } from "./steps/signature-form";

export const MultiStepForm = () => {
  const step = useNewTattooFormStore((state) => state.step);
  const formsMap = [
    <PersonalInformationForm />,
    <HealthForm />,
    <BeforeProcedureForm />,
    <AfterProcedureForm />,
    <SignatureForm />,
  ]

  return (
    <div>
      {formsMap[step]}
    </div>
  );
};
