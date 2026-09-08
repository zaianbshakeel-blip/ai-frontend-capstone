AI-Assisted Workflow Comparison
Round 1 — Vague Prompt

For Round 1, I used a deliberately vague prompt and accepted the AI-generated implementation with minimal direction. The result was a basic settings form containing username, email, password, theme selection, notifications, Save, and Reset controls. The implementation was functional, but the development process required more manual review because the requirements were not clearly defined in advance.

The main review effort was checking whether the generated form matched the intended feature, whether validation worked correctly, and whether the HTML, CSS, and JavaScript worked together. The vague approach was faster initially, but it created more uncertainty during review.

Round 2 — Precise Prompt

For Round 2, I used a fresh branch and a more precise prompt. I specified the required files, validation behavior, accessibility requirements, exact validation rules, and the expected verification process. The username validation uses /^[A-Za-z0-9_-]{3,20}$/ and the email validation uses /^[^\s@]+@[^\s@]+\.[^\s@]+$/. Password and theme requirements were also explicitly defined.

The precise workflow produced clearer validation logic, associated labels and error messages, aria-invalid, live error announcements, and validation on blur and form submission. I also manually tested invalid inputs, valid submission, and Reset behavior.

Correctness and AI Mistakes

The precise workflow was more reliable because the requirements were explicit, but it still required human review. One important AI-generated mistake I caught was in the CSS: the body used display: flex without setting flex-direction: column. This could cause the header, main content, and footer to appear horizontally instead of vertically. I also noticed an unused JavaScript variable and that the success message's .focus() call would not actually move focus because the element was not focusable.

These issues showed that precise prompting does not remove the need for testing and code review.

Accessibility and Edge Cases

Round 2 handled accessibility better by using proper labels, aria-describedby, aria-invalid, and live error messages. Edge cases such as empty fields, short usernames, invalid emails, weak passwords, missing themes, valid submission, and Reset were considered during testing.

Review Effort and Conclusion

Round 1 required less planning but more uncertainty and manual checking. Round 2 required more planning and prompt-writing time, but the resulting code was easier to review against explicit requirements. Overall, the precise workflow was more effective for correctness, accessibility, and predictable behavior.

The main lesson is that AI-generated code should be treated as a starting point rather than automatically correct. Clear requirements, a plan, verification, and human review produced a stronger result.
