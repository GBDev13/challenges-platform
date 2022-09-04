import { useCallback, useEffect, useRef } from "react";
import sdk, { VM } from "@stackblitz/sdk";
import { CodeEditorContainer } from "./styles";
import { IChallenge } from "interfaces/challenges.interface";

const AUTOSAVE_IN_MS = 10000;

interface CodeEditorProps {
  challenge: IChallenge;
  setInstructions: (instructions: string) => void;
}

export function CodeEditor({ challenge, setInstructions }: CodeEditorProps) {
  const projectId = challenge.embedId;

  const vm = useRef<VM | null>(null);

  const loadVM = useCallback(async () => {
    vm.current = await sdk.embedProjectId("embed", projectId, {
      openFile: "src/App.tsx",
    });

    const snapshot = await vm.current?.getFsSnapshot();

    if (snapshot) {
      const instructions = snapshot["README.md"];
      setInstructions(instructions);
    }

    const storagedData = localStorage.getItem(`savedData:${projectId}`);
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
  }, [projectId, setInstructions]);

  useEffect(() => {
    loadVM();
  }, [loadVM]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!vm?.current) return;

      const snapshot = await vm.current.getFsSnapshot();

      if (snapshot) {
        localStorage.setItem(
          `savedData:${projectId}`,
          JSON.stringify(snapshot)
        );
      }
    }, AUTOSAVE_IN_MS);

    return () => {
      clearInterval(interval);
    };
  }, [projectId]);

  return <CodeEditorContainer id="embed" />;
}
