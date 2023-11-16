import React, { useState } from 'react';
import Link from 'next/link';

const termsofservice = () => {
    const [agree, setAgree] = useState(false);

    const handleAgree = () => {
        setAgree(!agree);
        // other logic
    }
  return (
    
        <div className="bg-white p-6 m-4 rounded-md mt-[100px]">
            <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-gray-600 mb-6">Last Updated: October 28, 2023</p>
            <p className="mb-4">
                Welcome to www.kesha.com owned by Kesha (“Kesha Jewellery”), a company incorporated under the Companies Act, 2013, with its registered office at Malighat, Kali Bari Road, Muzaffarpur-842001, Bihar.
            </p>
            <p className="mb-4">
                These terms of use (referred to as the “Terms”) govern your use of the Website. By accessing or using the Website, you (“you,” “yourself,” “client,” or “user”) agree to be bound by these Terms. The terms “we,” “us,” “our,” “ours” refer to Kesha Jewellery.
            </p>

            <p className="mb-4">
                Your use of the Website indicates your acceptance of these Terms. If you do not agree to these Terms, please do not proceed.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Changes to these Terms</h2>
            <p className="mb-4">
                We reserve the right to revise these Terms at any time, and we will notify you of any changes through a selected medium. The revised Terms will be effective immediately upon being posted on the Website. Your continued use of the Website after the modifications constitutes your acceptance of the updated terms and conditions.
            </p>

            {/* ... (other sections) ... */}

            <h2 className="text-xl font-semibold mt-6 mb-4">Contact Information</h2>
            <p>
                If you have any questions, concerns, or feedback regarding these Terms, please contact us at: Maria Ross Beauty Care Pvt. Ltd. Malighat, Kali Bari Road, Muzaffarpur-842001, Bihar.
            </p>

            <div className="flex items-center mt-8">
                <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    checked={agree}
                    onChange={() => handleAgree()}
                />
                <label htmlFor="agree" className="ml-2 block text-sm leading-5 text-gray-900">
                    I have read and agree to the Terms & Conditions
                </label>
            </div>
            <Link href={`/`}>
                <button
                    disabled={!agree}
                    className={`mt-6 px-6 py-3 rounded-md bg-indigo-600 text-white disabled:opacity-50 ${!agree && 'cursor-not-allowed'
                        }`}
                >

                    Agree and Continue
                </button>
            </Link>
        </div>
    )
}



export default termsofservice