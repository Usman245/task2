import Image from "next/image";
import Step1 from "./component/Step1";
import { FormProvider } from "./FormContext";
export default function Home() {
  return (
  <div>
      <Step1 />
  </div>
  );
}
