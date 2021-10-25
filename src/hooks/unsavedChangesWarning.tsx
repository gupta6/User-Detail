import { useEffect, useState } from "react";
import { Prompt } from "react-router";

const UnsavedChangesWarning = (
  msg = "Value has not been saved, Are you sure you want to leave the page?"
) => {
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    if (isDirty) window.onbeforeunload = () => msg;

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty, msg]);

  const routerPrompt = <Prompt when={isDirty} message={msg} />;

  // return [routerPrompt, () => setDirty(true), () => setDirty(false)];

  return {
    prompt: routerPrompt,
    setDirty: () => setDirty(true),
    setPristine: () => setDirty(false),
  };
};

export default UnsavedChangesWarning;
