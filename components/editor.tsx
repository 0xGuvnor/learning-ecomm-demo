"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const Editor = ({ onChange, value }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );
  return (
    <section className="bg-background">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </section>
  );
};
export default Editor;
