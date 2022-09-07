import { useCallback, useEffect, useRef } from "react";
import sdk, { VM } from "@stackblitz/sdk";
import { CodeEditorContainer } from "./styles";
import { IChallenge } from "interfaces/challenges.interface";

const AUTOSAVE_IN_MS = 10000;

interface CodeEditorProps {
  embedId: string;
  setInstructions: (instructions: string) => void;
}

export function CodeEditor({ embedId, setInstructions }: CodeEditorProps) {
  const vm = useRef<VM | null>(null);

  const loadVM = useCallback(async () => {
    vm.current = await sdk.embedProjectId("embed", embedId, {
      openFile: "src/App.tsx",
    });

    const snapshot = await vm.current?.getFsSnapshot();

    if (snapshot) {
      const instructions = snapshot["README.md"];
      setInstructions(instructions);
    }

    const storagedData = localStorage.getItem(`savedData:${embedId}`);
    if (storagedData) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const parsed = JSON.parse(storagedData);
      await vm.current?.applyFsDiff({
        create: {
          ...parsed,
        },
        destroy: [],
      });
    }
  }, [embedId, setInstructions]);

  useEffect(() => {
    loadVM();
  }, [loadVM]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!vm?.current) return;

      const snapshot = await vm.current.getFsSnapshot();

      if (snapshot) {
        localStorage.setItem(`savedData:${embedId}`, JSON.stringify(snapshot));
      }
    }, AUTOSAVE_IN_MS);

    return () => {
      clearInterval(interval);
    };
  }, [embedId]);

  return <CodeEditorContainer id="embed" />;
}
