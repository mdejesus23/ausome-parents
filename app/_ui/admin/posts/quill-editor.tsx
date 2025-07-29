'use client';

import { useEffect, useRef } from 'react';
import type QuillType from 'quill'; // ✅ Import type only
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<QuillType | null>(null); // ✅ Strong typing

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { default: Quill } = await import('quill'); // Lazy import to avoid SSR error

      if (editorRef.current && mounted && !quillInstance.current) {
        quillInstance.current = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: 'Write something...',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              ['clean'],
            ],
          },
        });

        quillInstance.current.on('text-change', () => {
          onChange(quillInstance.current!.root.innerHTML);
        });

        // Set initial value
        if (value) {
          quillInstance.current.root.innerHTML = value;
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [onChange, value]);

  // Sync when parent value changes
  useEffect(() => {
    if (
      quillInstance.current &&
      value !== quillInstance.current.root.innerHTML
    ) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} className="min-h-[200px] rounded border" />;
}
