// import { signIn, SignInResponse } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const router = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const result: SignInResponse | undefined = await signIn("google", {
  //       callbackUrl: "/step3",
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //       setLoading(false);
  //       return;
  //     }

  //     // Fetch calendar events
  //     const response = await fetch("/api/auth/calendar", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setError(errorData.message || "Failed to fetch calendar events");
  //       setLoading(false);
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("Calendar events:", data.events);

  //     // Redirect to the next page
  //     router.push("/step3");
  //   } catch (error) {
  //     setError(`An unexpected error occurred`);
  //     setLoading(false);
  //   }
  // };

//   return (
    // <div className="container">
    //   <div className="head">
    //     <div className="logo">SF</div>
    //     <div className="title">Connect Your Digital Life</div>
    //     <div className="subtitle">
    //       <p>
    //         SyncFlow works best when it can see your schedule. <br />
    //         Connect your primary calendar to unify your tasks and <br /> events
    //       </p>
    //     </div>
    //     <br />
    //     <div className="shield">
    //       <div className="shield-icon">
    //         <Image
    //           src="/shield-alt-1-svgrepo-com.svg"
    //           alt="shield-icon"
    //           width={20}
    //           height={20}
    //         />
    //       </div>
    //       <span>your calendar data is encrypted and secure</span>
    //     </div>
    //   </div>
    //   <br />
    //   <div style={{ marginTop: "20px" }} className="sign-in-options">
    //     <div className="web-sign">
    //       {/* <a href="#"> */}
    //         <button
    //           className="accounts"
    //           onClick={handleGoogleSignIn}
    //           disabled={loading}
    //         >
    //           <Image
    //             src="/google-logo-search-new-svgrepo-com.svg"
    //             alt="Google logo"
    //             className="logo"
    //             width={10}
    //             height={10}
    //           />
    //           Continue with Google{" "}
    //           <div className="description_app">
    //             Sync your Google events and meetings
    //           </div>
    //         </button>
    //  </a>
    //  </div>
    //    <div className="web-sign">
    //     <a href="#">
    //       <button className="accounts">
    //         <Image
    //           src="/microsoft-svgrepo-com.svg"
    //           alt="Microsoft logo"
    //           className="logo"
    //           width={10}
    //           height={10}
    //         />
    //         Continue with Microsoft{" "}
    //         <div className="description_app">
    //           Sync your Outlook calendar and meetings
    //         </div>
    //       </button>
    //     </a>
    //   </div>
    //    <div className="web-sign">
    //     <a href="#">
    //       <button className="accounts">
    //         <Image
    //           src="/apple-logo-svgrepo-com.svg"
    //           alt="Apple logo"
    //           className="logo"
    //           width={10}
    //           height={10}
    //         />
    //         Continue with Apple &nbsp;
    //         <div className="description_app">
    //           Sync your Apple calendar and events
    //         </div>
    //       </button>
    //     </a>
    //   </div>
    // </div>
    // <section className="footer">
    //   <a className="link" href="#">
    //     Skip for now
    //   </a>
    // </section>
    // <section className="scroll-bar">
    //   <div className="parent-scroll">
    //     <a href="welcom-page.html">
    //       <div className="scroll-indicator" />
    //     </a>
    //     <a href="welcome-pg-2.html">
    //       <div className="scroll-indicator" />
    //     </a>
    //     <a href="welcome-pg-3.html">
    //       <div
    //         className="scroll-indicator"
    //         style={{ backgroundColor: "lightgray" }}
    //       />
    //     </a>
    //     <a href="welcome-pg-4.html">
    //       <div
    //         className="scroll-indicator"
    //         style={{ backgroundColor: "lightgray" }}
    //       />
    //     </a>
    //   </div>
    //   <br />
    //   <span className="subtitle">
    //     <p>step 2 of 4</p>
    //   </span>
    // </section>
    //  {error && (
    //     <div className="error-message">
    //       <p className="text-red-500">{error}</p>
    //     </div>
    //   )}
    //   {loading && (
    //     <div className="loading-message">
    //       <p>Loading...</p>
    //     </div>
    //   )}
    //  </div>
//   );
// }
