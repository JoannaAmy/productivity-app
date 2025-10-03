// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import '../styles/styles.css'
// import Link from 'next/link';
// import { redirect } from 'next/navigation';

// const SignUp: React.FC = () => {

//     const handleAuthenticate = () => {
//         redirect('/onboarding/step-1')
//         // localStorage.setItem

//     }


//     return (
//         <div className="parent-container2">
//             {/* Photo Section */}
//             <div className="photo-div">
//                 <Image
//                     src="/icons/5c03a8a45c6327de7a96dce8bb3c23ce41fa1e35.jpg"
//                     alt="Description of photo"
//                     width={700}
//                     height={700}
//                     style={{ objectFit: 'cover', width: '100%', height: '100vh' }}
//                 />
//             </div>

//             {/* Form Section */}
//             <div className="log-in-container">
//                 <div className="form-container">
//                     <div className="head">
//                         <div className="logo-container">
//                             <Image src="/icons/Group 29.svg" alt="ZenPlan Logo" width={100} height={100} />
//                         </div>
//                         <div className="title">
//                             Zen<span style={{ color: 'black' }}>Plan</span>
//                         </div>
//                         <div className="subtitle">Create your account</div>
//                     </div>

//                     <div className="sign-in-options">
//                         <div>
//                             <button className="accounts" onClick={handleAuthenticate}>
//                                 <Image
//                                     src="/icons/google-logo-search-new-svgrepo-com.svg"
//                                     alt="Google logo"
//                                     width={20}
//                                     height={20}
//                                     className="google-logo"
//                                 />
//                                 Continue with Google
//                             </button>
//                         </div>
//                     </div>

//                     <Link href='/sign-in'>Already have an account? Sign In</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;




'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import '../styles/styles.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn, useSignUp } from '@clerk/nextjs';

const SignIn: React.FC = () => {
    const { signUp, isLoaded } = useSignUp();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Doc link - https://clerk.com/docs/guides/development/custom-flows/authentication/oauth-connections
    const handleAuthenticate = async () => {
        if (!isLoaded || !signUp) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Start OAuth flow with Google
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback", // Clerk handles this
                redirectUrlComplete: "/onboarding/step-1",
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.log(err.errors)
            console.error(err, null, 2)
            console.error("Google sign-in error:", err);
            setError(err?.errors?.[0]?.message || "Something went wrong during sign-in.");
            setLoading(false);
        }
    };

    return (
        <div className="parent-container2">
            {/* Photo Section */}
            <div className="photo-div">
                <Image
                    src="/icons/5c03a8a45c6327de7a96dce8bb3c23ce41fa1e35.jpg"
                    alt="Description of photo"
                    width={700}
                    height={700}
                    style={{ objectFit: 'cover', width: '100%', height: '100vh' }}
                />
            </div>

            {/* Form Section */}
            <div className="log-in-container">
                <div className="form-container">
                    <div className="head">
                        <div className="logo-container">
                            <Image src="/icons/Group 29.svg" alt="ZenPlan Logo" width={100} height={100} />
                        </div>
                        <div className="title">
                            Zen<span style={{ color: 'black' }}>Plan</span>
                        </div>
                        <div className="subtitle">Create your account</div>
                    </div>

                    {error && (
                        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}

                    <div className="sign-in-options">
                        <div>
                            <button
                                className="accounts"
                                onClick={handleAuthenticate}
                                disabled={loading || !isLoaded}
                            >
                                <Image
                                    src="/icons/google-logo-search-new-svgrepo-com.svg"
                                    alt="Google logo"
                                    width={20}
                                    height={20}
                                    className="google-logo"
                                />
                                {loading ? 'Loading...' : 'Continue with Google'}
                            </button>
                        </div>
                    </div>

                    <Link href='/sign-in'>Already have an account? Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;