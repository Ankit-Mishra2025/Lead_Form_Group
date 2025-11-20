"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

// ---------------------- Loader / Spinner ----------------------
const Spinner = () => (
  <div className="flex flex-col justify-center items-center gap-2">
    <svg
      className="animate-spin h-10 w-10 text-green-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-30"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="6"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <span className="text-gray-700 text-lg font-medium">Loading form...</span>
  </div>
);

const Loader = () => (
  <div className="flex justify-center items-center min-h-[300px]">
    <Spinner />
  </div>
);

// ---------------------- Not Found ----------------------
const NotFound = ({ loanType }) => (
  <div className="text-center p-10 text-red-600">
    <h3 className="text-xl font-bold">Form not available for: {loanType}</h3>
    <p>Please check the loan type or contact support.</p>
  </div>
);

// ---------------------- Convert loanType → File Name ----------------------
const toPascalCase = (str) =>
  str
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("") + "Form";

// ---------------------- MAIN COMPONENT ----------------------

const LoanTypesRouting = () => {
  const [FormComponent, setFormComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const loanType = searchParams.get("loanType");

  useEffect(() => {
    if (!loanType) {
      setFormComponent(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fileName = toPascalCase(loanType);

    // ---- Dynamic possible paths for ANY form structure ----
    const possiblePaths = [
      `../LoanForms/forms/${fileName}.tsx`,
      `../LoanForms/forms/${fileName}.jsx`,

      

      `../LoanForms/forms/${fileName}/${fileName}.tsx`,
      `../LoanForms/forms/${fileName}/${fileName}.jsx`,

      `../LoanForms/forms/components/${fileName}/LoanForm.tsx`,
      `../LoanForms/forms/components/${fileName}/VehicleSelection.jsx`,



    ];

    let loaded = false;

    (async () => {
      for (const path of possiblePaths) {
        try {
          const mod = await import(/* @vite-ignore */ path);
          setFormComponent(() => mod.default);
          loaded = true;
          break;
        } catch (err) {
          // try next silently
        }
      }

      setTimeout(() => {
        setLoading(false);
        if (!loaded) setFormComponent(null);
      }, 500);
    })();
  }, [loanType]);

  return (
    <div className="min-h-screen bg-white p-8">
      {loading ? (
        <Loader />
      ) : FormComponent ? (
        <Suspense fallback={<Loader />}>
          <FormComponent />
        </Suspense>
      ) : loanType ? (
        <NotFound loanType={loanType} />
      ) : (
        <div className="text-center text-gray-600 p-6">
          Select a loan type.
        </div>
      )}
    </div>
  );
};

export default LoanTypesRouting;
