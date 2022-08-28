import { useCallback, useEffect, useRef } from "react";
import sdk, { VM } from "@stackblitz/sdk";
import { CodeEditorContainer } from "./styles";
import { IChallenge } from "interfaces/challenges.interface";

interface CodeEditorProps {
  challenge: IChallenge;
  setInstructions: (instructions: string) => void;
}

export default function CodeEditor({
  challenge,
  setInstructions,
}: CodeEditorProps) {
  const projectId = challenge.embedId;

  const vm = useRef<VM | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const loadVM = useCallback(async () => {
    vm.current = await sdk.embedProjectId("embed", projectId, {
      openFile: "src/App.tsx",
      view: "editor",
    });

    vm.current?.editor.setView("default");

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

    const snapshot = await vm.current?.getFsSnapshot();
    if (snapshot) {
      const instructions = snapshot["README.md"];
      setInstructions(instructions);
    }
  }, [projectId, setInstructions]);

  useEffect(() => {
    loadVM();
  }, [loadVM]);

  useEffect(() => {
    if (!iframeRef?.current?.contentWindow) return;
    iframeRef.current.contentWindow.document.onkeydown = async (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        const snapshot = await vm.current?.getFsSnapshot();
        localStorage.setItem(
          `savedData:${projectId}`,
          JSON.stringify(snapshot)
        );
      }
    };
  }, [iframeRef, projectId]);

  return <CodeEditorContainer id="embed" ref={iframeRef} />;
}
