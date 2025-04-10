// useDragDrop.js
import { useCallback } from "react";

const useDragDrop = (setFile, setDragActive, inputID) => {
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    },
    [setDragActive]
  );

  const handleDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    },
    [setDragActive]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFile(e.dataTransfer.files[0]);
      }
    },
    [setFile, setDragActive]
  );

  const handleAreaClick = useCallback(() => {
    document.getElementById(inputID)?.click();
  }, [inputID]);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
      }
    },
    [setFile]
  );

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAreaClick,
    handleFileChange,
  };
};

export default useDragDrop;
