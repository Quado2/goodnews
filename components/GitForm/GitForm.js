import { useEffect, useState } from "react";

import { GitFormWrapper } from "./GitForm.style";
import OurParticles from "../Particles/Particles";
import RollText from "../RollText/RollText";
import Input from "../Input/Input";

function GitForm({
  loadingState,
  submitLabel,
  formInputs,
  processInputs,
  welcomeMessage,
  actionMessage,
  spinnerComponent,
  isediting
}) {
  
  const [showSubmit, setShowSubmit] = useState(false);

  const [formValues, setFormValues] = useState({});
  const [visibleFormInputs, setVisibleFormInputs] = useState([]);


  useEffect(() => {
    if (formInputs) {
      setVisibleFormInputs([formInputs[0]]);
    }

  
  }, [formInputs]);
  

  const handleContinueClicked = (e, name, inputValue) => {
    e.preventDefault();
    setFormValues((prevValue) => {
      return {
        ...prevValue,
        [name]: inputValue,
      };
    });

    if (formInputs.length > visibleFormInputs.length) {
      setVisibleFormInputs((visibleInput) => {
        return [...visibleInput, formInputs[visibleFormInputs.length]];
      });
    } else {
      setShowSubmit(true);
    }
  };

  function handleFormSubmitted(e) {
    e.preventDefault();
    processInputs(formValues);
  }

  const submitButton = loadingState ? spinnerComponent: <input className="submit" type="submit" value={submitLabel} /> 

  return (
    <GitFormWrapper>
      <OurParticles />
      <form onSubmit={handleFormSubmitted}>
        <div className="form-top-text" disabled>
          {showSecond ? (
            <RollText text={welcomeMessage} />
          ) : (
            <div className="ticking"></div>
          )}
          {showThird ? <RollText text={actionMessage} /> : null}
        </div>

        {showName &&
          visibleFormInputs &&
          visibleFormInputs.map((formInput) => (
            <Input
              key={formInput.name}
              inputType={formInput.inputType}
              prompt={formInput.prompt}
              name={formInput.name}
              rules={formInput.rules}
              buttonDisabled={false}
              list={formInput.list}
              formValues={formValues}
              handleContinueClicked={handleContinueClicked}
            />
          ))}
        
        {showSubmit ? submitButton : null}
      </form>
    </GitFormWrapper>
  );
}

export default GitForm;
