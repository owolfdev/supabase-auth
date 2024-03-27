import Link from "next/link";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 py-24">
      <h1 className="font-bold text-4xl pb-4">Thank You</h1>
      <div className="flex-1 flex flex-col w-full  gap-2 text-foreground">
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center bg-gray-200 rounded-md">
            {searchParams.message}
          </p>
        )}
        <div className="text-center pt-8">
          <Link href="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
