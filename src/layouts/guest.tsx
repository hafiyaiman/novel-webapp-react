import { ThemeSwitch } from "@/components/theme-switch";
import { ToastProvider } from "@heroui/toast";


export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <ToastProvider />
      <main className="container mx-auto max-w-xl px-6 flex-grow">
        <div className="flex h-full w-full items-center justify-center">

          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <div className="flex  justify-end">
              <ThemeSwitch />
            </div>
            {children}
          </div>
        </div>
      </main>
      <footer className="w-full flex items-center justify-center py-3">
      </footer>
    </div>
  );
}


