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
}) {
  const [showSubmit, setShowSubmit] = useState(false);
  const [showName, setShowName] = useState(true);
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

  function updateData(name, inputValue){
    setFormValues((prevValue) => {
      return {
        ...prevValue,
        [name]: inputValue,
      };
    });
  }

  function handleFormSubmitted(e) {
    e.preventDefault();
    processInputs(formValues);
  }

  const submitButton = loadingState ? (
    spinnerComponent
  ) : (
    <input className="submit" type="submit" value={submitLabel} />
  );

  return (
    <GitFormWrapper>
      <OurParticles />
      <form onSubmit={handleFormSubmitted}>
        <div className="form-top-text" disabled>
          {<RollText text={welcomeMessage} />}
          <div className="wait_alil"> 
          <RollText text={actionMessage} />
          </div>
          
        </div>

        {showName &&
          visibleFormInputs &&
          visibleFormInputs.map((formInput) => {
            return  <Input
              key={formInput.name}
              inputType={formInput.inputType}
              prompt={formInput.prompt}
              name={formInput.name}
              rules={formInput.rules}
              buttonDisabled={false}
              list={formInput.list}
              formValues={formValues}
              value={formInput.initialValue}
              handleContinueClicked={handleContinueClicked}
              updateData = {updateData}
            />
          })}

        {showSubmit ? submitButton : null}
      </form>
    </GitFormWrapper>
  );
}

export default GitForm;
