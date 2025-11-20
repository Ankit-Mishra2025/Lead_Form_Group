export const formRegistry = {
  personalLoan: () =>
    import("../LoanForms/forms/components/PersonalLoanForm/LoanForm.tsx"),

  homeLoan: () =>
    import("../LoanForms/forms/components/HomeLoanForm/LoanForm.tsx"),

  businessLoan: () =>
    import("../LoanForms/forms/components/BusinessLoanForm/LoanForm.tsx"),
};
