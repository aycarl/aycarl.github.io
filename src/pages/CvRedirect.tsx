import { useEffect } from "react";
import { CV_URL } from "@/content/links";

// Fallback for environments where functions/cv.ts doesn't run (npm run dev,
// vite preview). In production the edge function redirects before the SPA loads.
const CvRedirect = () => {
  useEffect(() => {
    window.location.replace(CV_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
      Redirecting to CV…
    </div>
  );
};

export default CvRedirect;
