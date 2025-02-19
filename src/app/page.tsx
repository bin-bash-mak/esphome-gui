import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Welcome to ESPHome Config Creator</h1>
        <p>
          This is a demo application to help create ESPHome configurations using
          a easy drag and drop UI.
        </p>
        <p>Get started by exploring our editors:</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/flow"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Flow Editor
          </Link>
          {/* <Link
            href="/block"
            className="disabled rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          > */}
          Block Editor
          {/* </Link> */}
        </div>
      </main>
    </div>
  );
}

