
const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (
    ` You are an AI trained to generate interview questions and answers.

    Task:
    - Role: ${role}
    - Candidate Experience : ${experience} years
    - Focus Topics : ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code snippet to illustrate the answer.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
        {
            "question": "Question here?",
            "answer": "Detailed answer here."
        },
        ...
    ]
    Important: Do not add any extra text. Only return valid JSON.
`)

const conceptExplainPrompt = (question) =>(
    ` You are an AI trained to explain concepts in a simple and easy-to-understand manner.
    Task:
    - Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the explanation.
    - If the explanation includes a code example, provide a small code block.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    {
        "title": "Short title here?",
        "explanation": "Detailed explanation here.",
    }
    Important: Do not add any extra text. Only return valid JSON.
    `
)

module.exports = {  questionAnswerPrompt, conceptExplainPrompt };