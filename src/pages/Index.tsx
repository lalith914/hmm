import { useState } from "react";
import QuestionPage from "@/components/QuestionPage";
import SuccessPage from "@/components/SuccessPage";

const Index = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen">
      {!accepted ? (
        <QuestionPage onYes={() => setAccepted(true)} />
      ) : (
        <SuccessPage />
      )}
    </div>
  );
};

export default Index;
