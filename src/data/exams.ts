import { Exam } from '../types';

export const SAMPLE_EXAMS: Exam[] = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    category: 'General',
    description: 'Test your awareness of world geography, international organizations, history, and key global milestones.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which is the largest ocean on Earth by surface area?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
        correctAnswer: 2,
        explanation: 'The Pacific Ocean covers over 60 million square miles, making it significantly larger than all other oceans combined.'
      },
      {
        id: 2,
        question: 'In which year did the United Nations officially establish its headquarters in New York City?',
        options: ['1945', '1952', '1939', '1960'],
        correctAnswer: 1,
        explanation: 'While the UN was founded in 1945 in San Francisco, its permanent headquarters complex in Manhattan officially opened in 1952.'
      },
      {
        id: 3,
        question: 'Which country is known as the "Land of the Midnight Sun"?',
        options: ['Norway', 'Iceland', 'Canada', 'Finland'],
        correctAnswer: 0,
        explanation: 'Norway experiences continuous daylight during summer months above the Arctic Circle, earning it this famous nickname.'
      },
      {
        id: 4,
        question: 'Who was the first female Prime Minister of the United Kingdom?',
        options: ['Theresa May', 'Margaret Thatcher', 'Angela Merkel', 'Queen Elizabeth II'],
        correctAnswer: 1,
        explanation: 'Margaret Thatcher served as Prime Minister of the UK from 1979 to 1990.'
      },
      {
        id: 5,
        question: 'What is the currency of Japan?',
        options: ['Won', 'Yuan', 'Yen', 'Ringgit'],
        correctAnswer: 2,
        explanation: 'The Japanese Yen (JPY, ¥) is the official legal tender of Japan.'
      },
      {
        id: 6,
        question: 'Which planet in our solar system is nicknamed the "Red Planet"?',
        options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
        correctAnswer: 1,
        explanation: 'Mars appears reddish due to the high concentration of iron oxide (rust) on its surface.'
      },
      {
        id: 7,
        question: 'Which African nation has the largest population as of recent estimates?',
        options: ['Egypt', 'South Africa', 'Nigeria', 'Ethiopia'],
        correctAnswer: 2,
        explanation: 'Nigeria is Africa\'s most populous nation, with over 220 million residents.'
      },
      {
        id: 8,
        question: 'Who painted the famous masterpiece "The Starry Night"?',
        options: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Leonardo da Vinci'],
        correctAnswer: 1,
        explanation: 'Dutch post-impressionist painter Vincent van Gogh created "The Starry Night" in June 1889.'
      },
      {
        id: 9,
        question: 'What is the longest river in the world according to most geographic surveys?',
        options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
        correctAnswer: 1,
        explanation: 'The Nile River in northeastern Africa spans approximately 6,650 kilometers (4,132 miles).'
      },
      {
        id: 10,
        question: 'Which element has the chemical symbol "Au"?',
        options: ['Silver', 'Gold', 'Argon', 'Aluminum'],
        correctAnswer: 1,
        explanation: '"Au" comes from the Latin word "Aurum", which means shining dawn or gold.'
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Essential Mathematics & Algebra',
    subject: 'Mathematics',
    category: 'Science & Math',
    description: 'Assess core problem-solving competencies in algebra, percentages, geometry, and arithmetic sequences.',
    durationMinutes: 15,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'If 3x + 7 = 22, what is the value of x?',
        options: ['3', '5', '7', '15'],
        correctAnswer: 1,
        explanation: 'Subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5.'
      },
      {
        id: 2,
        question: 'What is 15% of 240?',
        options: ['24', '30', '36', '42'],
        correctAnswer: 2,
        explanation: '10% of 240 = 24. 5% of 240 = 12. 24 + 12 = 36.'
      },
      {
        id: 3,
        question: 'What is the perimeter of a rectangle with length 14 cm and width 6 cm?',
        options: ['20 cm', '40 cm', '84 cm', '28 cm'],
        correctAnswer: 1,
        explanation: 'Perimeter = 2 × (length + width) = 2 × (14 + 6) = 2 × 20 = 40 cm.'
      },
      {
        id: 4,
        question: 'What is the square root of 289?',
        options: ['13', '15', '17', '19'],
        correctAnswer: 2,
        explanation: '17 × 17 = 289.'
      },
      {
        id: 5,
        question: 'A train travels 180 km in 3 hours. What is its average speed in meters per second (m/s)?',
        options: ['16.67 m/s', '20.0 m/s', '50.0 m/s', '60.0 m/s'],
        correctAnswer: 0,
        explanation: 'Speed = 180 km / 3 h = 60 km/h. To convert km/h to m/s, multiply by (5/18): 60 × 5 / 18 ≈ 16.67 m/s.'
      },
      {
        id: 6,
        question: 'If the radius of a circle is 7 cm, what is its circumference? (Use π ≈ 22/7)',
        options: ['22 cm', '44 cm', '154 cm', '88 cm'],
        correctAnswer: 1,
        explanation: 'Circumference = 2 × π × r = 2 × (22/7) × 7 = 44 cm.'
      },
      {
        id: 7,
        question: 'What is the next number in the arithmetic progression: 7, 12, 17, 22, ...?',
        options: ['25', '26', '27', '29'],
        correctAnswer: 2,
        explanation: 'The common difference d = 12 - 7 = 5. Next term = 22 + 5 = 27.'
      },
      {
        id: 8,
        question: 'What is the value of 2^5 - 3^2?',
        options: ['19', '21', '23', '25'],
        correctAnswer: 2,
        explanation: '2^5 = 32 and 3^2 = 9. 32 - 9 = 23.'
      },
      {
        id: 9,
        question: 'If the angles of a triangle are in the ratio 2 : 3 : 4, what is the largest angle?',
        options: ['40°', '60°', '80°', '90°'],
        correctAnswer: 2,
        explanation: 'Total ratio parts = 2 + 3 + 4 = 9. Sum of angles = 180°. Each part = 180 / 9 = 20°. Largest angle = 4 × 20° = 80°.'
      },
      {
        id: 10,
        question: 'Solve for y: 4(y - 2) = 2(y + 6)',
        options: ['5', '8', '10', '12'],
        correctAnswer: 2,
        explanation: 'Expand: 4y - 8 = 2y + 12 => 2y = 20 => y = 10.'
      }
    ]
  },
  {
    id: 'science',
    title: 'General Science & Environmental Studies',
    subject: 'Science',
    category: 'Science & Math',
    description: 'Explore fundamentals across biology, chemistry, physics, and atmospheric science.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Beginner',
    questions: [
      {
        id: 1,
        question: 'Which gas is most abundant in the Earth\'s atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        correctAnswer: 2,
        explanation: 'Nitrogen makes up approximately 78% of the Earth\'s atmosphere, followed by oxygen at about 21%.'
      },
      {
        id: 2,
        question: 'What is the powerhouse organelle of an animal cell?',
        options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Endoplasmic Reticulum'],
        correctAnswer: 1,
        explanation: 'Mitochondria generate most of the chemical energy needed to power biochemical reactions via ATP production.'
      },
      {
        id: 3,
        question: 'What is the acceleration due to gravity on Earth near sea level (approximate)?',
        options: ['9.8 m/s²', '8.9 m/s²', '11.2 m/s²', '6.67 m/s²'],
        correctAnswer: 0,
        explanation: 'Standard gravity near Earth\'s surface is approximately 9.80665 m/s².'
      },
      {
        id: 4,
        question: 'Which vitamin is synthesized in the human skin through exposure to sunlight?',
        options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 3,
        explanation: 'Ultraviolet B (UVB) rays from sunlight trigger cholesterol in the skin to produce Vitamin D3.'
      },
      {
        id: 5,
        question: 'What is the pH level of pure, neutral distilled water at 25°C?',
        options: ['5', '7', '9', '14'],
        correctAnswer: 1,
        explanation: 'A pH of 7 is neutral on the logarithmic scale from 0 (very acidic) to 14 (very alkaline).'
      },
      {
        id: 6,
        question: 'Which human blood type is termed the "universal red blood cell donor"?',
        options: ['O Negative (O-)', 'AB Positive (AB+)', 'A Negative (A-)', 'O Positive (O+)'],
        correctAnswer: 0,
        explanation: 'Type O Negative blood lacks A, B, and Rh antigens, making it safe for almost any recipient in emergencies.'
      },
      {
        id: 7,
        question: 'Sound travels fastest through which of the following media?',
        options: ['Vacuum', 'Air', 'Water', 'Steel'],
        correctAnswer: 3,
        explanation: 'Sound waves are mechanical vibrations requiring particles. They travel fastest in dense solids like steel (~5,100 m/s).'
      },
      {
        id: 8,
        question: 'Which layer of the atmosphere contains the ozone layer that absorbs harmful UV rays?',
        options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
        correctAnswer: 1,
        explanation: 'The stratosphere holds the ozone layer between approximately 15 and 35 kilometers above Earth.'
      },
      {
        id: 9,
        question: 'What is the boiling point of water at standard sea-level atmospheric pressure?',
        options: ['90°C', '95°C', '100°C', '110°C'],
        correctAnswer: 2,
        explanation: 'At 1 atmosphere (101.3 kPa), water boils at 100°C (212°F).'
      },
      {
        id: 10,
        question: 'Which process do green plants use to convert sunlight into glucose?',
        options: ['Fermentation', 'Photosynthesis', 'Respiration', 'Transpiration'],
        correctAnswer: 1,
        explanation: 'Photosynthesis uses chlorophyll to combine water and carbon dioxide in the presence of light, yielding glucose and oxygen.'
      }
    ]
  },
  {
    id: 'english-grammar',
    title: 'English Language & Verbal Proficiency',
    subject: 'English',
    category: 'Language',
    description: 'Sharpen your command of grammar rules, vocabulary, idioms, sentence correction, and syntax.',
    durationMinutes: 10,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'Choose the correct form: "Neither the manager nor the employees _____ available for the meeting."',
        options: ['is', 'are', 'was', 'being'],
        correctAnswer: 1,
        explanation: 'With "neither... nor...", the verb agrees with the subject closest to it ("the employees" is plural, so "are").'
      },
      {
        id: 2,
        question: 'Identify the word closest in meaning (synonym) to "Ephemeral":',
        options: ['Eternal', 'Fleeting', 'Gigantic', 'Subtle'],
        correctAnswer: 1,
        explanation: '"Ephemeral" means lasting for a very short time, which is synonymous with "fleeting".'
      },
      {
        id: 3,
        question: 'Select the sentence with correct punctuation and spelling:',
        options: [
          'Its important that their going to submit there reports on time.',
          'It\'s important that they\'re going to submit their reports on time.',
          'It\'s important that their going to submit they\'re reports on time.',
          'Its important that they\'re going to submit there reports on time.'
        ],
        correctAnswer: 1,
        explanation: '"It\'s" (it is), "they\'re" (they are), and "their" (possessive pronoun for reports) are used correctly.'
      },
      {
        id: 4,
        question: 'Which part of speech is the word "quickly" in: "She quickly finalized the examination"?',
        options: ['Adjective', 'Adverb', 'Conjunction', 'Preposition'],
        correctAnswer: 1,
        explanation: '"Quickly" modifies the verb "finalized", describing how the action was performed, making it an adverb.'
      },
      {
        id: 5,
        question: 'What is the antonym of the word "Meticulous"?',
        options: ['Careless', 'Thorough', 'Precise', 'Diligent'],
        correctAnswer: 0,
        explanation: '"Meticulous" means showing great attention to detail. Its opposite is "careless".'
      },
      {
        id: 6,
        question: 'Choose the correct preposition: "She is capable _____ solving complex technical challenges."',
        options: ['for', 'to', 'of', 'in'],
        correctAnswer: 2,
        explanation: 'The adjective "capable" is idiomatically followed by the preposition "of" + gerund.'
      },
      {
        id: 7,
        question: 'What does the idiom "burn the midnight oil" mean?',
        options: [
          'To waste electricity carelessly',
          'To study or work late into the night',
          'To start a hazardous campfire',
          'To arrive late to work'
        ],
        correctAnswer: 1,
        explanation: '"Burning the midnight oil" historically referred to working late by oil lamp, and now means studying or working late.'
      },
      {
        id: 8,
        question: 'Select the passive voice form of: "The committee approved the revised proposal."',
        options: [
          'The revised proposal was approved by the committee.',
          'The committee has been approving the revised proposal.',
          'The revised proposal has approved the committee.',
          'Approving the revised proposal was the committee.'
        ],
        correctAnswer: 0,
        explanation: 'In past simple passive, the object ("The revised proposal") is followed by "was approved by" the subject.'
      },
      {
        id: 9,
        question: 'Choose the correctly spelled word:',
        options: ['Accomodate', 'Acommodate', 'Accommodate', 'Accomadate'],
        correctAnswer: 2,
        explanation: '"Accommodate" is spelled with two \'c\'s and two \'m\'s.'
      },
      {
        id: 10,
        question: 'Which sentence is a conditional sentence in the second conditional form?',
        options: [
          'If it rains, we will cancel the match.',
          'If I won the lottery, I would travel the entire world.',
          'If you heat ice, it melts.',
          'If he had studied, he would have passed.'
        ],
        correctAnswer: 1,
        explanation: 'Second conditional uses "If + past simple, ... would + bare infinitive" to express hypothetical present/future situations.'
      }
    ]
  },
  {
    id: 'computer-basics',
    title: 'Computer Fundamentals & IT Systems',
    subject: 'Computer Basics',
    category: 'Technology',
    description: 'Test your understanding of hardware architectures, operating systems, networking protocols, and cybersecurity.',
    durationMinutes: 12,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 1,
        question: 'What does the acronym "CPU" stand for in computing?',
        options: [
          'Central Performance Unit',
          'Central Processing Unit',
          'Core Programming Unit',
          'Control Power Utility'
        ],
        correctAnswer: 1,
        explanation: 'The Central Processing Unit is the primary component of a computer that executes program instructions.'
      },
      {
        id: 2,
        question: 'Which type of computer memory is volatile and loses data when power is disconnected?',
        options: ['ROM', 'SSD', 'RAM', 'Flash Drive'],
        correctAnswer: 2,
        explanation: 'RAM (Random Access Memory) requires electrical power to maintain state; without power, its data is immediately lost.'
      },
      {
        id: 3,
        question: 'What standard communication protocol is used for secure encrypted browsing on the World Wide Web?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
        correctAnswer: 1,
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communication over TLS/SSL for secure data transfer.'
      },
      {
        id: 4,
        question: 'How many bits are in one standard byte?',
        options: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correctAnswer: 1,
        explanation: 'One standard byte is made up of 8 bits.'
      },
      {
        id: 5,
        question: 'Which of the following is an open-source operating system kernel?',
        options: ['Microsoft Windows', 'macOS', 'Linux', 'iOS'],
        correctAnswer: 2,
        explanation: 'Linux is a widely adopted free and open-source Unix-like operating system kernel created by Linus Torvalds.'
      },
      {
        id: 6,
        question: 'What does "DNS" stand for in networking?',
        options: [
          'Data Network System',
          'Domain Name System',
          'Dynamic Network Server',
          'Direct Node Service'
        ],
        correctAnswer: 1,
        explanation: 'The Domain Name System translates human-friendly domain names (e.g. google.com) into numerical IP addresses.'
      },
      {
        id: 7,
        question: 'Which data structure operates on a "Last-In, First-Out" (LIFO) order?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'A Stack removes the most recently added element first, following the LIFO principle.'
      },
      {
        id: 8,
        question: 'What is the primary function of a Firewall in a computer network?',
        options: [
          'To accelerate network internet speed',
          'To monitor and filter incoming and outgoing network traffic based on security rules',
          'To store permanent backup copies of system files',
          'To compile computer code into machine language'
        ],
        correctAnswer: 1,
        explanation: 'A firewall acts as a security barrier, inspecting traffic to block unauthorized access and prevent threats.'
      },
      {
        id: 9,
        question: 'What is the file extension typically used for JavaScript modules?',
        options: ['.java', '.js', '.py', '.rb'],
        correctAnswer: 1,
        explanation: '.js (or .mjs / .ts for TypeScript) is the file extension for JavaScript source files.'
      },
      {
        id: 10,
        question: 'Which of the following is considered malicious software that encrypts user files and demands payment?',
        options: ['Adware', 'Ransomware', 'Spyware', 'Bloatware'],
        correctAnswer: 1,
        explanation: 'Ransomware holds victim files or systems hostage by strong encryption until a ransom is paid.'
      }
    ]
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning & Analytical Aptitude',
    subject: 'Reasoning',
    category: 'Aptitude',
    description: 'Challenge your critical thinking with syllogisms, pattern analysis, blood relations, and deductive logic.',
    durationMinutes: 15,
    totalQuestions: 10,
    passingPercentage: 40,
    difficulty: 'Advanced',
    questions: [
      {
        id: 1,
        question: 'Find the missing number in the sequence: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '48'],
        correctAnswer: 1,
        explanation: 'The differences between consecutive numbers are +4, +6, +8, +10. Next difference is +12: 30 + 12 = 42.'
      },
      {
        id: 2,
        question: 'Statements: "All apples are fruits. All fruits are healthy." Conclusion: "Are all apples healthy?"',
        options: [
          'Definitely true',
          'Definitely false',
          'Probably false',
          'Cannot be determined'
        ],
        correctAnswer: 0,
        explanation: 'By standard categorical syllogism: if set A is contained in set B, and set B is in set C, then set A is completely in set C.'
      },
      {
        id: 3,
        question: 'Pointing to a photograph, a woman says: "His mother is the only daughter of my mother." Who is the woman to the person in the photo?',
        options: ['Sister', 'Mother', 'Aunt', 'Grandmother'],
        correctAnswer: 1,
        explanation: '"The only daughter of my mother" is the woman herself. Therefore, she is the mother of the person in the photograph.'
      },
      {
        id: 4,
        question: 'If "CLOUD" is coded as "ENQWF", what will "RAIN" be coded as in the same cipher?',
        options: ['TCKP', 'SCJQ', 'TBJP', 'TCJP'],
        correctAnswer: 0,
        explanation: 'Each letter is shifted forward by 2 positions: R+2=T, A+2=C, I+2=K, N+2=P -> TCKP.'
      },
      {
        id: 5,
        question: 'A clock shows 3:15. What is the angle between the hour hand and the minute hand?',
        options: ['0°', '7.5°', '12°', '15°'],
        correctAnswer: 1,
        explanation: 'At 3:15, the minute hand is at 90°. The hour hand moves 0.5° per minute: 90° + (15 × 0.5°) = 97.5°. Angle = 97.5° - 90° = 7.5°.'
      },
      {
        id: 6,
        question: 'Which word does NOT belong with the others in the group?',
        options: ['Triangle', 'Square', 'Circle', 'Pentagon'],
        correctAnswer: 2,
        explanation: 'Triangle (3), Square (4), and Pentagon (5) are polygons bounded by straight lines; a Circle is bounded by a curved line.'
      },
      {
        id: 7,
        question: 'If South-East becomes North, and North-East becomes West, what will West become?',
        options: ['South-East', 'North-West', 'South-West', 'North-East'],
        correctAnswer: 0,
        explanation: 'The directions are rotated 135° counter-clockwise. West rotated 135° counter-clockwise becomes South-East.'
      },
      {
        id: 8,
        question: 'Five people A, B, C, D, and E are in a line. C is between A and E. B is to the right of E. D is to the left of A. Who is in the middle?',
        options: ['A', 'B', 'C', 'E'],
        correctAnswer: 2,
        explanation: 'The order from left to right is: D - A - C - E - B. Therefore, C is exactly in the middle.'
      },
      {
        id: 9,
        question: 'In a code, 123 means "hot filtered coffee", 356 means "very hot day", and 589 means "day and night". Which digit stands for "very"?',
        options: ['3', '5', '6', '8'],
        correctAnswer: 2,
        explanation: 'In statements 1 and 2, "3" is common and corresponds to "hot". In statements 2 and 3, "5" is common and corresponds to "day". Therefore, "6" must correspond to "very".'
      },
      {
        id: 10,
        question: 'If today is Wednesday, what day of the week will it be 100 days from today?',
        options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
        correctAnswer: 1,
        explanation: '100 divided by 7 leaves a remainder of 2 (100 = 14 × 7 + 2). Wednesday + 2 days = Friday.'
      }
    ]
  }
];
