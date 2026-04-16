"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin portal
    router.push("/admin");
  }, [router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-cream">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-dark font-medium italic">Redirecting to Secure Login...</p>
    </div>
  );
}
