"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const schema = z.object({
  terms: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    setServerError(null);
    setGoogleLoading(true);
    signIn("google", { callbackUrl: "/step1" });
  };

  return (
    <div className="container">
      <div className="head">
        <div className="logo">SF</div>
        <div className="title">Create Your Account</div>
        <div className="subtitle">Join SyncFlow today</div>
      </div>

      <section>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <div style={{ marginBottom: "15px" }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-14 h-14 mr-2 align-middle"
                    />
                    <label htmlFor="terms">
                      I agree to the terms of service and Privacy Policy
                    </label>
                  </div>
                )}
              />
              {errors.terms && (
                <p className="text-red-500">{errors.terms.message}</p>
              )}
            </div>

            {serverError && <p className="text-red-500">{serverError}</p>}

            <button className="accounts" type="submit" disabled={isSubmitting}>
              {googleLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <Image
                    src="/google-logo-search-new-svgrepo-com.svg"
                    alt="Google logo"
                    className="logo"
                    width={10}
                    height={10}
                  />
                  Continue with Google
                </>
              )}
            </button>
          </form>
        </div>

        <section className="footer">
          <div className="footer-content">
            <p>
              <span className="link">Already have an account? </span>
              <span className="highlight">
                <Link href="/signin">Log in</Link>
              </span>
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
