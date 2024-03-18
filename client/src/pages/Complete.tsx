import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const Complete = () => {
  return (
    //Do a page which has an image and text saying Authentication complete
    <ThemeProvider>
      <div className="p-64 items-center justify-center h-screen space-y-5">
        <div className="text-3xl font-bold text-center">
          Authentication complete
        </div>
        <div className="text-xl text-center">
          You can now close this window and return to the app.
        </div>
      </div>
    </ThemeProvider>
  );
};
