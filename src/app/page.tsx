import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
          Welcome to Galaxy Digital
      </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
            <button>Login</button>
            <button>Signup</button>
        </div>
    </main>
  );
}
