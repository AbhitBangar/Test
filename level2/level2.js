// MCQ Questions Data
const questions = [
    // Set 1
    {
        question: "The embryological structure responsible for formation of adrenal medulla is:",
        options: ["A. Mesoderm", "B. Endoderm", "C. Neural crest cells", "D. Ectoderm"],
        correct: 2
    },
    {
        question: "The most common site of duodenal ulcer is:",
        options: ["A. First part – anterior wall", "B. First part – posterior wall", "C. Second part", "D. Third part"],
        correct: 0
    },
    {
        question: "Which nerve is damaged in Erb's palsy?",
        options: ["A. C5–C6", "B. C6–C7", "C. C7–C8", "D. C8–T1"],
        correct: 0
    },
    // Set 2
    {
        question: "In Prameha, which Dhatu is affected first according to classics?",
        options: ["A. Rasa", "B. Rakta", "C. Meda", "D. Mamsa"],
        correct: 2
    },
    {
        question: "In bronchial asthma, the most important pathological change is:",
        options: ["A. Alveolar collapse", "B. Bronchial smooth muscle hypertrophy", "C. Pleural effusion", "D. Pulmonary fibrosis"],
        correct: 1
    },
    {
        question: "The drug of choice for acute anaphylaxis:",
        options: ["A. Hydrocortisone", "B. Chlorpheniramine", "C. Adrenaline", "D. Salbutamol"],
        correct: 2
    },
    // Set 3
    {
        question: "The largest dural venous sinus is:",
        options: ["A. Straight sinus", "B. Transverse sinus", "C. Superior sagittal sinus", "D. Cavernous sinus"],
        correct: 2
    },
    {
        question: "The artery most commonly injured in fracture neck of humerus:",
        options: ["A. Axillary artery", "B. Brachial artery", "C. Radial artery", "D. Subclavian artery"],
        correct: 0
    },
    {
        question: "Which investigation is most specific for DVT?",
        options: ["A. D-dimer", "B. Venography", "C. Doppler ultrasound", "D. CT scan"],
        correct: 1
    },
    // Set 4
    {
        question: "According to Charaka, Shareera is best defined as:",
        options: ["A. Panchabhautika deha", "B. Combination of Dosha–Dhatu–Mala", "C. Chetana adhisthana", "D. All of the above"],
        correct: 3
    },
    {
        question: "Coin test is used in diagnosis of:",
        options: ["A. Pleural effusion", "B. Pneumothorax", "C. Lung abscess", "D. Bronchial asthma"],
        correct: 1
    },
    {
        question: "Ritu Sandhi period consists of:",
        options: ["A. 7 days", "B. 14 days", "C. 21 days", "D. 30 days"],
        correct: 1
    },
    // Set 5
    {
        question: "In infant development, social smile appears at:",
        options: ["A. 1 month", "B. 2 months", "C. 3 months", "D. 4 months"],
        correct: 1
    },
    {
        question: "Which vitamin deficiency causes both osteomalacia and hypocalcemia?",
        options: ["A. Vitamin A", "B. Vitamin D", "C. Vitamin K", "D. Vitamin C"],
        correct: 1
    },
    {
        question: "Which drug is used as antidote in organophosphate poisoning?",
        options: ["A. Naloxone", "B. Atropine", "C. Flumazenil", "D. Vitamin K"],
        correct: 1
    },
    // Set 6
    {
        question: "The narrowest part of male urethra:",
        options: ["A. Prostatic urethra", "B. Membranous urethra", "C. Spongy urethra", "D. External meatus"],
        correct: 3
    },
    {
        question: "The valve most commonly affected in rheumatic heart disease:",
        options: ["A. Aortic", "B. Tricuspid", "C. Pulmonary", "D. Mitral"],
        correct: 3
    },
    {
        question: "First line management of status asthmaticus:",
        options: ["A. Oral steroids", "B. Inhaled salbutamol", "C. IV antibiotics", "D. Theophylline"],
        correct: 1
    },
    // Set 7
    {
        question: "Hridaya according to Ayurveda is primarily the seat of:",
        options: ["A. Vata", "B. Pitta", "C. Kapha", "D. Chetana"],
        correct: 3
    },
    {
        question: "Graafian follicle is present in:",
        options: ["A. Medulla of ovary", "B. Cortex of ovary", "C. Fallopian tube", "D. Endometrium"],
        correct: 1
    },
    {
        question: "Pakshaghata is mainly due to vitiation of:",
        options: ["A. Vyana Vata", "B. Udana Vata", "C. Prana Vata", "D. Samana Vata"],
        correct: 0
    }
];

// Quiz State
let currentQuestion = 0;
let score = 0;
let isAnswered = false;

// DOM Elements
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionsContainer = document.querySelector('.options-container');
const resultMessage = document.querySelector('.result-message');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const progressFill = document.querySelector('.progress-fill');

// Initialize Quiz
function initQuiz() {
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const question = questions[currentQuestion];
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.correct = index === question.correct;
        button.addEventListener('click', () => selectAnswer(button, index));
        optionsContainer.appendChild(button);
    });
    
    // Reset state
    isAnswered = false;
    resultMessage.textContent = '';
    resultMessage.className = 'result-message';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    
    // Update progress bar
    updateProgressBar();
}

// Select Answer
function selectAnswer(button, selectedIndex) {
    if (isAnswered) return;
    
    isAnswered = true;
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // Disable all options
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(option => {
        option.disabled = true;
        option.classList.add('disabled');
    });
    
    // Show correct/incorrect states
    button.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (!isCorrect) {
        // Show correct answer
        allOptions[question.correct].classList.add('correct');
    }
    
    // Update score
    if (isCorrect) {
        score++;
    }
    
    // Show result message
    showResultMessage(isCorrect);
    
    // Show navigation buttons
    nextBtn.style.display = 'inline-flex';
    prevBtn.style.display = currentQuestion > 0 ? 'inline-flex' : 'none';
}

// Show Result Message
function showResultMessage(isCorrect) {
    if (isCorrect) {
        resultMessage.textContent = '✅ Correct! Well done!';
        resultMessage.classList.add('correct');
    } else {
        resultMessage.textContent = '❌ Incorrect. Try to learn from this!';
        resultMessage.classList.add('incorrect');
    }
}

// Next Question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Update Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Show Final Result
function showFinalResult() {
    const percentage = Math.round((score / questions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'Excellent! Outstanding performance!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Great job! Good performance!';
        emoji = '🌟';
    } else if (percentage >= 50) {
        message = 'Good effort! Keep practicing!';
        emoji = '👍';
    } else {
        message = 'Keep learning! You can do better!';
        emoji = '📚';
    }
    
    // Update quiz container with final result
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <div class="final-result">
            <div class="result-header">
                <h2>${emoji} Quiz Complete!</h2>
            </div>
            <div class="result-stats">
                <div class="score-display">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/ ${questions.length}</span>
                </div>
                <div class="percentage-display">
                    <span class="percentage-number">${percentage}%</span>
                </div>
            </div>
            <div class="result-message">
                <p>${message}</p>
            </div>
            <div class="action-buttons">
                <button class="retry-btn" onclick="location.reload()">Try Again</button>
                <button class="home-btn" onclick="window.location.href='../select.html'">Home</button>
            </div>
        </div>
    `;
    
    // Add styles for final result
    const style = document.createElement('style');
    style.textContent = `
        .final-result {
            text-align: center;
            padding: 2rem;
        }
        
        .result-header h2 {
            font-size: 2.5rem;
            color: #6600CC;
            margin-bottom: 2rem;
        }
        
        .result-stats {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3rem;
            margin-bottom: 2rem;
        }
        
        .score-display {
            font-size: 3rem;
            font-weight: bold;
            color: #6600CC;
        }
        
        .score-total {
            font-size: 1.5rem;
            color: #6c757d;
        }
        
        .percentage-display {
            font-size: 2.5rem;
            font-weight: bold;
            color: #28a745;
        }
        
        .result-message p {
            font-size: 1.3rem;
            color: #2c3e50;
            margin-bottom: 2rem;
        }
        
        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        
        .retry-btn, .home-btn {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .retry-btn {
            background: linear-gradient(145deg, #6600CC, #5a00b3);
            color: #fff;
            box-shadow: 0 0.3rem 1rem rgba(102, 0, 204, 0.3);
        }
        
        .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1.5rem rgba(102, 0, 204, 0.4);
        }
        
        .home-btn {
            background: linear-gradient(145deg, #28a745, #20c997);
            color: #fff;
            box-shadow: 0 0.3rem 1rem rgba(40, 167, 69, 0.3);
        }
        
        .home-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 0.5rem 1.5rem rgba(40, 167, 69, 0.4);
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
